'use strict'

const express = require('express');
const router = express.Router();
const model = require('../models');
const giveLetter = require('../helpers/score')

router.use((req,res, next)=>{
  if(req.session.user.role == 'academic' || req.session.user.role == 'headmaster'){
    next();
  }else{
    res.sendStatus(403);
  }
})


router.get('/', function(req,res){
  model.Subjects.findAll()
  .then(function(rowsSubject){
    let promises = rowsSubject.map(subject => {
      return new Promise(function(resolve, reject){
        subject.getTeachers()
        .then(teacher => {
          subject.first_name = [];
          subject.subject_name = subject.subject_name
          teacher.forEach(name => {
            subject.first_name.push(name.dataValues.first_name +' '+ name.dataValues.last_name)

          })
          return resolve(subject)
        })
        .catch(err => reject(err));
      })
    })
    Promise.all(promises)
    .then(function(subject){
      res.render('subjects', {data:subject, title: 'list Subject'})
    })
  })
  })

  // router.get('/', function(req, res){
  //   model.Subjects.findAll({
  //     include:[{all:true}]
  //   })
  //   .then(function(rows){
  //     res.render('subjects', {data:rows});
  //   })
  // })

  router.get('/add', function(req,res){
    res.render('subjectsAdd', {title: 'Add Subject'})
  })

router.post('/add', function(req,res){
  model.Subjects.create({
    subject_name: req.body.subject_name
  })
  .then(function(){
    res.redirect('/subjects')
  })
})

router.get('/delete/:id', function(req,res){
  model.Subjects.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(function(){
    res.redirect('/subjects')
  })
})


router.get('/enroll/:id', function(req, res){
  model.StudentSubjects.findAll({
    order:[['Student', 'first_name']],
    where: {
      SubjectId: req.params.id
    },
    include:[{all:true}]
  })
  .then(function(rows){
      let letter = giveLetter(rows);
      res.render('enroll', {data:rows, title: 'Enroll Subject', scoreLetter: letter})
  })
})

router.get('/givescore/:id/:ids', function(req, res){
  model.StudentSubjects.findAll({
    where: {
      StudentId: req.params.id,
      $and: {
        SubjectId: req.params.ids
      }
    },
    include:[{all:true}]
  })
  .then(function(row){
    res.render('givescore', {data:row[0], title: 'Give Score'})
  })
})

router.post('/givescore/:id/:ids', function(req, res){
  model.StudentSubjects.update({
    score: req.body.score,
    updateAt: new Date()
  },{
    where:{
      StudentId: req.params.id,
      $and: {
        SubjectId: req.params.ids
      }
    }
  })
  .then(function(){
    res.redirect(`subject/enroll/${req.params.ids}`)
  })
})

// no 7 example
// model.Subject.findOne()
// .then(function(subject){
//   subject.getStudents()
//   .then(function(student){
//     student.forEach(name => {
//       console.log(name);
//     })
//   })
// })

//d table conjunction tambah score
//dr conjunction include a dan b
//example join include
// db.pupilClub.findAll({
//   include: [{all: true}]
// })
// .then(row => {
//   row.forEach(pc => {
//     console.log(pc);
//   })
// })


// router.get('/enroll/:id', function(req,res){
//   model.Subjects.findById(req.params.id)
//   .then(function(row){
//     row.getStudents()
//     .then(function(students){
//       res.render('enroll', {data:row, data2:students})
//     })
//   })
// })


  // model.Subjects.findAll()
  // .then(function(rows){
  //   res.render('subjects', {data: rows});
  // })


module.exports = router;

'use strict'

const express = require('express');
const router = express.Router();
const model = require('../models');


router.get('/', function(req,res){
  model.Subjects.findAll()
  .then(function(rowsSubject){
    let promises = rowsSubject.map(subject => {
      return new Promise(function(resolve, reject){
        subject.getTeachers()
        .then(teacher => {
          subject.first_name = [];
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
      res.render('subjects', {data:subject})
    })
  })


// router.get('/enroll/:id', function(req,res){
//   model.Subjects.findById(req.params.id)
//   .then(function(row){
//     row.getStudents()
//     .then(function(students){
//       res.render('enroll', {data:row, data2:students})
//     })
//   })
// })

router.get('/enroll/:id', function(req, res){
  model.StudentSubjects.findAll({
    where: {
      SubjectId: req.params.id
    }
  }, {
    include:[{all:true}]
  })
  .then(function(rows){
      res.render('enroll', {data:rows})
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



  // model.Subjects.findAll()
  // .then(function(rows){
  //   res.render('subjects', {data: rows});
  // })
})

module.exports = router;

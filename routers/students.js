'use strict'

const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', function(req,res){
  model.Students.findAll()
  .then(function(rows){
    res.render('students', {data:rows})
    })
})

router.get('/add', function(req,res){
  res.render('studentsAdd', {errs: ''})
})

// router.post('/', function(req, res){
//   model.Students.create({
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     createAt: new Date(),
//     updateAt: new Date()
//   })
//   .then(function(){
//     res.redirect('/students');
//   })
//   .catch(function(err){
//     res.render('studentsAdd', {errs: err.message});
//   })
// })

router.get('/delete/:id', function(req, res){
  model.Students.destroy({where:{
    id: parseInt(req.params.id)
  }})
  .then(function(){
    res.redirect('/students');
  })
})

router.get('/edit/:id', function(req, res){
  model.Students.findById(req.params.id)
  .then(function(rows){
    res.render('studentsEdit',{data:rows, errs: ''})
  })
})

// router.post('/edit/:id', function(req, res){
//   model.Students.update({
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email
//   },{
//     where:{
//       id: parseInt(req.params.id)
//     }
//   })
//   .then(function(data, err){
//     res.redirect('/students')
//   })
//   .catch(function(err){
//     model.Students.findById(req.params.id)
//     .then(function(rows){
//       res.render('studentsEdit',{data:rows, errs: err})
//     })
//   })
// })

///test

router.post('/', function(req, res){
  model.Students.findOne({
    where:{
      email:req.body.email
    }
  })
  .then(function(result){
    if(!result){
      model.Students.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        createAt: new Date(),
        updateAt: new Date()
      })
      .then(function(){
        res.redirect('/students')
      })
      .catch(function(err){
        res.render('studentsAdd', {errs: err.message});
      })
    }else {
      res.render('studentsAdd', {errs: 'Email sudah di pakai'});
    }
  })
})

router.post('/edit/:id', function(req, res){
  model.Students.findOne({
    where:{
      email: req.body.email
    }
  })
.then(function(result){
  if(!result || req.body.email === req.body.emailOri){
    model.Students.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      updatedAt: new Date()
    },{
      where:{
        id:req.params.id
      }
    })
    .then(function(){
      res.redirect('/students');
    })
    .catch(function(err){
      model.Students.findById(req.params.id)
      .then(function(rows){
        res.render('studentsEdit',{data:rows, errs: err})
      })
    })
  }else{
    res.send('email sudah di pakai')
  }
})
})

router.get('/addSubject/:id', function(req, res){
  model.Students.findById(req.params.id)
  .then(function(rows){
    model.Subjects.findAll()
    .then(function(rows_subject){
      res.render('addStudentSubject', {data: rows, data2: rows_subject})
    })
  })
})

router.post('/addSubject/:id', function(req, res){
  model.StudentSubjects.create({
    StudentId: parseInt(req.params.id),
    SubjectId: req.body.SubjectId
  })
  .then(function(){
    res.redirect('/students')
  })
})

// router.get('/find/:id', function(req, res){
//   model.Students.findOne({
//     where:{
//       email: req.params.id
//     }
//   })
//   .then(function(rows){
//     res.send(rows);
//   })
//   .catch(function(err){
//     res.send(err);
//   })
// })

module.exports = router;

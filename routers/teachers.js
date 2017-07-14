'use strict'

const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', function(req,res){
  model.Teacher.findAll()
  .then(function(rowsTeacher){
    let promises = rowsTeacher.map(teacher =>{
      return new Promise(function(resolve, reject){
        teacher.getSubject()
        .then(subject => {
          if(teacher.SubjectId == null){
            teacher.subject_name = 'unassigned'
          }else {
            teacher.subject_name = subject.subject_name;
          }
          return resolve(teacher)
        })
        .catch(err => reject(err));
      })
    })
    Promise.all(promises)
    .then(function(teacher){
      res.render('teachers',{data:teacher})
    })
  })

  // model.Teacher.findAll()
  // .then(function(rows){
  //   res.render('teachers',{data:rows})
  //   })
})

router.get('/add', function(req, res){
  model.Subjects.findAll()
  .then(function(rows){
    res.render('teachersAdd', {data: rows});
  })
})

router.post('/', function(req, res){
  model.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId,
    createAt: new Date(),
    updateAt: new Date()
  })
  .then(function(){
    res.redirect('/teachers');
  })
})

router.get('/delete/:id', function(req, res){
  model.Teacher.destroy({
    where:{
      id: parseInt(req.params.id)
    }
  })
  .then(function(){
    res.redirect('/teachers')
  })
})

router.get('/edit/:id', function(req, res){
  model.Teacher.findById(req.params.id, {
    include: [model.Subjects]
  })
  .then(function(row){
    model.Subjects.findAll()
    .then(function(rows){
      res.render('teachersEdit', { data:row, data_subject: rows})
    })
  })
})

router.post('/edit/:id', function(req, res){
  model.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId,
    updateAt: new Date()
  },{
    where:{
      id: req.params.id
    }
  })
  .then(function(){
    res.redirect('/teachers')
  })
})

module.exports = router;

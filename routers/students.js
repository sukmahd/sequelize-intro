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
  res.render('studentsAdd')
})

router.post('/', function(req, res){
  model.Students.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createAt: new Date(),
    updateAt: new Date()
  })
  .then(function(){
    res.redirect('/students');
  })
  .catch(function(err){
    res.send(err);
  })
})

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
    res.render('studentsEdit',{data:rows})
  })
})

router.post('/edit/:id', function(req, res){
  model.Students.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  },{
    where:{
      id: parseInt(req.params.id)
    }
  })
  .then(function(){
    res.redirect('/students')
  })
})

router.get('/find/:id', function(req, res){
  model.Students.findOne({
    where:{
      email: req.params.id
    }
  })
  .then(function(rows){
    res.send(rows);
  })
  .catch(function(err){
    res.send(err);
  })
})

module.exports = router;

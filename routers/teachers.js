'use strict'

const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', function(req,res){
  model.Teacher.findAll()
  .then(function(rows){
    res.render('teachers',{data:rows})
    })
})

router.get('/add', function(req, res){
  res.render('teachersAdd');
})

router.post('/', function(req, res){
  model.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createAt: new Date(),
    updateAt: new Date()
  })
  .then(function(){
    res.redirect('/teachers');
  })
})

module.exports = router;

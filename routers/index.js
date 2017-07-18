'use strict'

const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', function(req, res){
  res.render('index', {title: 'Home', role: ''})
})


router.get('/signup', function(req,res){
  res.render('signup', {title: 'Signup', msg: ''})
})

router.post('/signup', function(req,res){
  model.User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  })
  .then(function(){
    res.redirect('/login')
  })
})

router.get('/login', function(req,res){
  if(req.session.user){
    res.redirect('/')
  }else {
    res.render('login', {title: 'login', msg: ''})
  }
})

router.post('/login', function(req,res){
  if(!req.body.username || !req.body.password)
  {
    res.send('please enter username and password')
  }
  else
  {
    model.User.findOne({
      where: {
        username:req.body.username
      }
    })
    .then(function(row){
      if(row.password == req.body.password)
      {
          req.session.user = {
            username: req.body.username,
            role: row.role
          }
          if(row.role == 'teacher'){
            res.redirect('students')
          }else if (row.role == 'academic') {
            res.redirect('subjects')
          }else {
            res.redirect('teachers')
          }

      }else
      {
          res.send('password salah')
      }
    })
    .catch(function(err){
      res.send('user not found')
    })
  }
})

router.get('/logout', function(req,res){
  req.session.destroy( err => {
    res.redirect('/');
  })
})


module.exports = router;

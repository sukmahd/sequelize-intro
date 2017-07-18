'use strict'

const express = require('express');
const router = express.Router();
const model = require('../models');
const crypto = require('crypto');
const hash = require('../helpers/hash')

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
      //hash
      const secret = row.salt;
      const hashData = hash(secret, req.body.password);
      if(hashData == row.password){
        req.session.user = {
          username: row.username,
          role: row.role
        }
        res.redirect('/students')
      }else {
        res.render('login', {title:'login', msg: 'Password Anda Salah'})
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

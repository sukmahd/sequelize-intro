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


module.exports = router;

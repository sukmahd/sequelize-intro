'use strict'

const express = require('express');
const router = express.Router();
const model = require('../models');


router.get('/', function(req,res){
  model.Subjects.findAll()
  .then(function(rows){
    res.render('subjects', {data: rows});
  })
})

module.exports = router;

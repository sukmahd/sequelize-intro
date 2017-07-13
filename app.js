'use strict'

const express = require('express');
const app = express();
const model = require('./models');

const teachers = require('./routers/teachers');
const subjects = require('./routers/subjects');
const students = require('./routers/students');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/', function(req, res){
  res.send('hai');
})


app.use('/teachers', teachers)
app.use('/subjects', subjects)
app.use('/students', students)
app.use('/students/add', students)
app.use('/students/delete/:id', students)
app.use('/students/edit/:id', students)

app.listen(3000);
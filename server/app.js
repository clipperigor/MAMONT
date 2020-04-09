'use strict';
var express = require('express');

var  Pool = require('pg');
var Client  = require('pg');
///////////////////Доступ к данным


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var infoRouter = require('./routes/info');
var deptsRouter = require('./routes/depts');
var empsRouter = require('./routes/emps');
var empRouter = require('./routes/emp');
var dmlRouter = require('./routes/dml');
var phonesRouter = require('./routes/phones');
var usersRouter = require('./routes/users');
var mamontsensorsRouter = require('./routes/mamont-sensors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/info', infoRouter);
app.use('/depts', deptsRouter);
app.use('/emps', empsRouter);
app.use('/emp', empRouter);
app.use('/dml', dmlRouter);

app.use('/phones', phonesRouter);
app.use('/users', usersRouter);
app.use('/mamontsensors', mamontsensorsRouter);


module.exports = app;

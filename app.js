const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const app = express();




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/users', usersRouter);
app.post('/users', usersRouter)
app.get('/users/:id', usersRouter);
app.delete('/users/:id', usersRouter);
app.put('/users/:id', usersRouter);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users');
const db = mongoose.connection;
db.on("error", error=>console.log(error));
db.on('open', ()=>console.log('connected'));





module.exports = app;

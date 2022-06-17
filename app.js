import express, { json, urlencoded } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';

import usersRouter from './routes/users.js';
export const app = express();




app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/users', usersRouter);
app.post('/users', usersRouter)
app.get('/users/:id', usersRouter);
app.delete('/users/:id', usersRouter);
app.put('/users/:id', usersRouter);

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/users');
const db = mongoose.connection;
db.on("error", error=>console.log(error));
db.on('open', ()=>console.log('Connected'));






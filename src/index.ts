import {Express} from "express";
import routes from './routes/routes'

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

dotenv.config();

const app: Express = express();
 
app.use(express.json());

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listen the port: http://localhost:${port}`)
})

app.use(cors({
    credentials: true,
    origin: process.env.CORS,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
}));

app.use('/users',routes.userRouter);
app.use('/exams',routes.examRouter);
import {Express} from "express";
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listen the port: http://localhost:${port}`)
})



const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const crypto = require('crypto');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/hackr_io');

mongoose.connection.on('connected', ()=>{
    console.log("Database Connected \u{1F525}");
});

// Routes
const authRoute = require('./routes/auth');

// MiddleWares

app.use('/api', authRoute);

let port = process.env.PORT || 3300;

app.listen(port, console.log(`Server Started on port: ${port} \u{1F525}\u{1F680}`));

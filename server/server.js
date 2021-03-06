const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

mongoose.connect(process.env.CLOUD_DATABASE_URL || process.env.LOCAL_DATABASE_URL);

mongoose.connection.on('connected', () => {
    console.log("Database Connected \u{1F525}");
});

// Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const linkRoute = require('./routes/link');

// MiddleWares
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', categoryRoute);
app.use('/api', linkRoute);

let port = process.env.PORT || 3300;

app.listen(port, console.log(`Server Started on port: ${port} \u{1F525}\u{1F680}`));

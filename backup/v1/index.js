const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
// Import route
const authRoute = require('./routes/auth');

dotenv.config();

// Connect to mongoDb
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db!'));

// Middleware
app.use(express.json());
app.use(cors());

// Route Middleware
app.use('/auth', authRoute);

app.listen(3000, () => console.log(('Server Up and running')))
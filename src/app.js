require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const authRoutes = require('./modules/routes/auth');
const contentRoutes = require('./modules/routes/contentRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

db.connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

module.exports = app;
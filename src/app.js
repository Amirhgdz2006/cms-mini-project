require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const authRoutes = require('./modules/routes/auth');
const contentTypeRoutes = require('./modules/routes/contentTypeRoutes');
const contentRoutes = require('./modules/routes/contentRoutes')
const { loadDynamicModels } = require('./modules/utils/loadDynamicModels');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

async function initApp() {
  try {
    await db.connectDB();
    await loadDynamicModels();
    console.log('Dynamic models loaded successfully');
  } catch (error) {
    console.error('Error connecting to DB or loading models:', error);
  }
}

initApp();

app.use('/api/auth', authRoutes);
app.use('/api/content-type', contentTypeRoutes);
app.use('/api/content', contentRoutes);


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

module.exports = app;

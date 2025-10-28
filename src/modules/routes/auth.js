const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authController');

const signup = authControllers.signup;
const login = authControllers.login;

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
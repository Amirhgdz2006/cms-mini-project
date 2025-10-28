const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async function (req, res) {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 'message': "An account with this email already exists" })
    }

    const user = new User({ username, email, hashedPassword });

    await user.save();
    res.status(200).json({ "message": "Your account has been created successfully" });
  } catch (error) {
    res.status(500).json({ "error": error.message });
  }
};

exports.login = async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ "message": 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) return res.status(401).json({ "message": 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    });

    res.status(200).json({ "message": "You’ve successfully logged in" });

  } catch (error) {
    res.status(500).json({ "error": error.message });
  }
};





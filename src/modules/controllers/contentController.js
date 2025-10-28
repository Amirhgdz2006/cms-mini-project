const Content = require('../models/contentModel');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// async function findUserByToken(req, res) {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ "message": "Unauthorized: No token found" })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded) {
//       return res.status(401).json({ "message": "Invalid token" })
//     }

//     const user = await User.findById(decoded.id)
//     if (!user) {
//       return res.status(404).json({ "message": "User not found" })
//     }

//     return user;

//   }
//   catch (error) {
//     res.status(400).json({ "error": error.message })
//   }
// }

// Create
exports.createContent = async function (req, res) {
  try {
    var data = req.body;
    if (req.user) {
      if (req.user.id) {
        data.createBy = req.user.id
      }
      else if (req.user._id) {
        data.createBy = req.user._id
      }
    }
    var content = await Content.create(data)
    res.status(200).json(content)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}


// Read one (by id or slug)
exports.getContent = async function (req, res) {
  try {
    const { slug } = req.params;
    const content = await Content.findOne({ slug })
    if (!content) return res.status(404).json({ message: 'No content found for the provided slug' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ "error": err.message });
  }
};

// Update
exports.updateContent = async function (req, res) {
  try {
    const { slug } = req.params;
    const content = await Content.findOneAndUpdate({ slug }, req.body, { new: true });

    if (!content) return res.status(404).json({ message: 'No content found for the provided slug' });
    res.json(content);
  } catch (err) {
    res.status(400).json({ "error": err.message });
  }
};

// Delete
exports.deleteContent = async function (req, res) {
  try {
    const { slug } = req.params;
    const content = await Content.findOneAndDelete({slug});
    if (!content) return res.status(404).json({ message: 'No content found for the provided slug' });
    res.json({ message: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

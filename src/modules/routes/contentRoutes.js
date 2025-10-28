const express = require('express');
const router = express.Router();
const contentCtrl = require('../controllers/contentController');
const { authenticateUser } = require('../../core/middleware/authMiddleware');
const { authorizeRoles } = require('../../core/middleware/roleMiddleware');


router.post('/', authenticateUser, authorizeRoles('editor', 'admin'), contentCtrl.createContent);
router.get('/:slug', authenticateUser, contentCtrl.getContent);
router.put('/:slug', authenticateUser, authorizeRoles('editor', 'admin'), contentCtrl.updateContent);
router.delete('/:slug', authenticateUser, authorizeRoles('admin'), contentCtrl.deleteContent);

module.exports = router;

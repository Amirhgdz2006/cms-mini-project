const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/contentTypeController');
const { authenticateUser } = require('../../core/middleware/authMiddleware');
const { authorizeRoles } = require('../../core/middleware/roleMiddleware');

router.post('/', authenticateUser, authorizeRoles('admin' , 'editor'), ctrl.createContentType);
router.get('/', authenticateUser, ctrl.getAllContentTypes);
router.put('/:id', authenticateUser, authorizeRoles('admin', 'editor'), ctrl.updateContentType);
router.delete('/:id', authenticateUser, authorizeRoles('admin'), ctrl.deleteContentType);

module.exports = router;

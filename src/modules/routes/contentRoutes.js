const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/contentController');
const { authenticateUser } = require('../../core/middleware/authMiddleware');
const { authorizeRoles } = require('../../core/middleware/roleMiddleware');

router.get('/:type', authenticateUser, ctrl.getAllRecords);
router.get('/:type/:id', authenticateUser, ctrl.getRecordById);

router.post('/:type', authenticateUser, authorizeRoles('admin', 'editor'), ctrl.createRecord);
router.put('/:type/:id', authenticateUser, authorizeRoles('admin', 'editor'), ctrl.updateRecord);
router.delete('/:type/:id', authenticateUser, authorizeRoles('admin'), ctrl.deleteRecord);

module.exports = router;

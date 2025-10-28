const express = require('express');
const router = express.Router();
const contentCtrl = require('../controllers/contentController');
// const authMiddleware = require('../../core/middleware/authMiddleware');

router.post('/', contentCtrl.createContent);
router.get('/:slug', contentCtrl.getContent);
router.put('/:slug', contentCtrl.updateContent);
router.delete('/:slug', contentCtrl.deleteContent);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/content.controller');

// Public route to read content
router.get('/', controller.getContent);

// Protected route to update content (In real app, add middleware verifyToken here)
router.post('/', controller.updateContent);

module.exports = router;

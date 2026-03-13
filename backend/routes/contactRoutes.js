const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route to submit contact form
router.post('/', contactController.submitContact);

// Protected route to view all contacts
router.get('/', authMiddleware, contactController.getContacts);

module.exports = router;

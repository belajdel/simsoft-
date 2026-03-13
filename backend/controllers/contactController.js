const Contact = require('../models/Contact');

// @desc    Submit a contact form
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const contactItem = await Contact.create({
      name,
      email,
      message,
      subject
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contactItem
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all contact submissions
// @access  Private (Admin)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Contacts retrieved successfully',
      data: contacts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

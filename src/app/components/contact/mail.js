const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:4200', // allow requests from Angular app
  methods: ['GET', 'POST'], // specify allowed methods
  allowedHeaders: ['Content-Type'], // specify allowed headers
    credentials: true, // Allow credentials
}));
app.use(bodyParser.json());

app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  // Transporter for Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'belajdelmedamine@gmail.com',
      pass: 'dyny fstd dvem hhtp',
    },
  });

  const mailOptions = {
    from: email,
    to: 'belajdelmedamine@gmail.com',
    subject: subject,
    text: `Name: ${name}\nPhone: ${phone}\nCompany: ${company}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
    console.log(error);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
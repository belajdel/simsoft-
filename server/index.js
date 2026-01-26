const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const contactRoutes = require('./routes/contact.routes');

app.use('/api', contactRoutes);

// Base route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to SimSoft API' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

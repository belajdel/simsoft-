const jwt = require('jsonwebtoken');

// Secret key for JWT (in production, use environment variable)
const SECRET_KEY = 'simsoft-secret-key-prod';

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Simple hardcoded check as per "Admin" actor in diagram
    // In a real app, check against database
    if (username === 'admin' && password === 'admin123') {
        // User found
        const token = jwt.sign({ id: 1, username: 'admin' }, SECRET_KEY, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: 1,
            username: 'admin',
            accessToken: token
        });
    } else {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password or Username!"
        });
    }
};

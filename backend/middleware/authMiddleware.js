const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header: "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach decoded payload to request
      req.user = decoded;

      next();
    } catch (error) {
      console.error('JWT Error:', error);
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized, no token provided',
    });
  }
};

module.exports = authMiddleware;

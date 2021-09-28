const jwt = require('jsonwebtoken');
const config = require('config');
const user = require('../models/User');

module.exports = function (req, res, next) {
  // get the request to header
  const token = req.header('x-auth-token');
  // check the token are exist or not and not exist then should raise error
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Authorization denied , token missing' });
  }
  try {
    // token exist then to verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (erro) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

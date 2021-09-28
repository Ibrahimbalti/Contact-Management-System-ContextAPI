const express = require('express');
const { check, validationResult } = require('express-validator');
const config = require('config');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../middlewares/auth');
// Jo phly sa hi login user ko get kra ga
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Jo login ko form ko submit krga wo user ha

router.post(
  '/',
  [
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter a password').exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ msg: error.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: 'A user does not exist this email' });
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password' });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600000,
        },
        (erro, token) => {
          if (erro) throw erro;
          res.json({ token });
        }
      );
    } catch (erro) {
      console.error(erro.message);
      res.status(400).send('server error');
    }
  }
);

module.exports = router;

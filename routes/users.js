const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
router.post(
  '/',
  [
    // not().isEmpty() is check the name field not be empty
    check('name', 'Please enter a name').not().isEmpty(),
    //isEmail() is check to give a wrong email format then raise a error
    check('email', 'Enter valid eamil').isEmail(),
    //isLenght is check if give a password less then 6 charactor then this error raise
    check('password', 'Enter password with minimum six charactors').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // validationResult to run the all check and store output of checks
    const errors = validationResult(req);
    //!errors.isEmpty means errors empty nai ha means is ma error ha
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    // Get the data from reqest body or postman or form .the name email and password come from postman or form
    const { name, email, password } = req.body;

    try {
      // fondone is query to goes to database and search the user who has email is exist or not
      let user = await User.findOne({ email });

      // check if the email exist the raise the error other to create new user
      if (user) {
        return res.status(400).json({ msg: 'User email already exist' });
      }

      // To create new user ....the name email and password are get from user model
      user = new User({
        name,
        email,
        password,
      });

      // salt use for to more secure your passowrd
      const salt = await bcryptjs.genSalt(10);
      // create a hash password ...to more secure your password if any access the data base they can not get the plane password
      user.password = await bcryptjs.hash(password, salt);

      // we save the data into database
      await user.save();

      // check on the  postman  user are created or not
      // res.send('user are created');

      // payload is object tha contain the user id and we pass this payload to jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      // user jwt token,,,we pass payload and screte data and give expire date or time and make a call back function
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600000,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server errors');
    }
  }
);

module.exports = router;

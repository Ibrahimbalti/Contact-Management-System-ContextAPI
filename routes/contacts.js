const express = require('express');
const router = express.Router();
const contact = require('../models/Contact');
const auth = require('../middlewares/auth');
const user = require('../models/User');
const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req, res) => {
  try {
    // find the current login user by id and sort the data by latest data -1 means latest data contact should appear top
    const contacts = await contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);

    c;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
      const newContact = new contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contacts = await newContact.save();
      res.json(contacts);
    } catch (erro) {
      console.error(erro.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/:id', (req, res) => {
  res.send('Update the contacts');
});

router.delete('/:id', (req, res) => {
  res.send('Delete the contacts');
});

module.exports = router;

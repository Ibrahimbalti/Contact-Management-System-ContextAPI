const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middlewares/auth');
const user = require('../models/User');
const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req, res) => {
  try {
    // find the current login user by id and sort the data by latest data -1 means latest data contact should appear top
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
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
      const newContact = new Contact({
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

router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  // to user the key and values
  const contactField = {};
  //contactField.name is a keya and name is value
  if (name) contactField.name = name;
  if (email) contactField.email = email;
  if (phone) contactField.phone = phone;
  if (type) contactField.type = type;

  try {
    // we get the id from parameter of routes and params mean parameter.
    // we find the contacts
    let contact = await Contact.findById(req.params.id);
    // we check the contact is exist or not
    if (!contact) {
      return res.status(404).json({ msg: 'This contact does not exist' });
    }
    // if the contact exist ,we check current user is owner to that contact or not
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'You do not have the correct authorization to update this contact',
      });
    }

    // update the contact ,if the above condition pass
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactField,
      },
      // new means if the contact not exist the create new contacts
      { new: true }
    );

    res.send(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', (req, res) => {
  res.send('Delete the contacts');
});

module.exports = router;

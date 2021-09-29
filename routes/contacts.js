const express = require('express');
const router = express.Router();
const contact = require('../models/Contact');
const auth = require('../middlewares/auth');
const user = require('../models/User');

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

router.post('/', (req, res) => {
  res.send('Add a contacts');
});

router.put('/:id', (req, res) => {
  res.send('Update the contacts');
});

router.delete('/:id', (req, res) => {
  res.send('Delete the contacts');
});

module.exports = router;

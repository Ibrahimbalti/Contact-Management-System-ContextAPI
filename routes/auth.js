const express = require('express');
const router = express.Router();

// Jo phly sa hi login user ko get kra ga
router.get('/', (req, res) => {
  res.send('Get login user');
});

// Jo login ko form ko submit krga wo user ha

router.post('/', (req, res) => {
  res.send('Login user');
});

module.exports = router;

const express = require('express');
const router = express.Router();
router.post('/', (req, res) => {
  res.send('Hi Iam user');
});

module.exports = router;

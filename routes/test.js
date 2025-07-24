const express = require('express');
const router = express.Router();

router.get('/anything', (req, res) => {
  res.json({ message: 'Hello from /api/anything' });
});

module.exports = router;

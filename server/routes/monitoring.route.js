const express = require('express');
const router = express.Router();


router.route('/')
  .get((req, res) => res.json({ running: true, ip_request: req.ip }));

module.exports = router;

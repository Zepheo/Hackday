const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('go to /api to see the different resources');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const blogsRouter = require('./blogs');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/blogs', blogsRouter);


module.exports = router;

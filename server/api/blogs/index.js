const express = require('express');
const router = express.Router();
const blogsApi = require('./blogsUtils');

router.get('/', async (req, res, next) => {
  try {
    const result = await blogsApi.getBlogs();
    res.json(result);
  } catch(err) {
    res.sendStatus(500);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { title, content } = req.body;
  if( title && content) {
    try {
      await blogsApi.createBlog({ title, content });
      res.sendStatus(201);
    } catch(err) {
      res.sendStatus(500);
      next(err);
    }
  } else {
    res.send('Missing title or content');
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await blogsApi.getBlog(req.params.id);
    res.json(result);
  } catch(err) {
    res.sendStatus(500);
    next(err);
  }
});



module.exports = router;


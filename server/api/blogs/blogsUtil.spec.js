const blogUtils = require('./blogsUtils');
const assert = require('assert');
const fs = require('fs');

describe('blogUtils', () => {
  describe('getBlogs', () => {
    it('should give a list of all blogs', async () => {
      const res = await blogUtils.getBlogs();

      assert.equal(res.length, 2);
    })
    
    it('should have title and content', async () => {
      const res = await blogUtils.getBlogs();
      assert.equal(res[0].title, 'post_1.md');
      assert.equal(res[0].content, '<h1 id="firstblogpost">First blogpost</h1>\n' +
      '<p>This it the first post on the blog just to have something to server up at the star…</p>');
    })
  });
  describe('getBlog', () => {
    it('should give html of entire blog post', async () => {
      const res = await blogUtils.getBlog('1');
      const expected = '<h1 id="firstblogpost">First blogpost</h1>\n' +
      '<p>This it the first post on the blog just to have something to server up at the start testing a little bit more</p>'

      assert.equal(res, expected);
    });
  });
});
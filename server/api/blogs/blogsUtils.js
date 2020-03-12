const fs = require('fs');
const { promisify } = require('util');
const showdown = require('showdown');

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const converter = new showdown.Converter();

const db = `${__dirname}/../../db/blogs`;


async function getBlogs() {  
  const blogList = await readDir(db);

  const blogListWithExcerpt = await Promise.all(
    blogList.map(async (blog) => {
      const content = await getBlogContent(blog)
      const html = converter.makeHtml(content.substring(0,100) + '...');
      return {
        title: blog,
        content: html
      }
    }))
  
  return blogListWithExcerpt;
}

async function getBlog(id) {
  const content = await getBlogContent(`post_${id}.md`);
  const html = converter.makeHtml(content);
  return html;
}

async function getBlogContent(file) {
  return (await readFile(`${db}/${file}`)).toString();
}

module.exports = { getBlogs, getBlog };
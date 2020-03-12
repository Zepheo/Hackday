const fs = require('fs');
const { promisify } = require('util');
const showdown = require('showdown');

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const converter = new showdown.Converter();

const db = `${__dirname}/../../db/blogs`;

function sortName(a,b) {
  return (b.replace(/^post_|\.md$/g, '') - a.replace(/^post_|\.md$/g, ''));
  
}

async function getBlogs() {  
  const blogList = (await readDir(db)).sort((a,b) => sortName(a,b));
  

  const blogListWithExcerpt = await Promise.all(
    blogList.map(async (blog) => {
      const id = blog.replace(/^post_|\.md$/g, '')
      const content = await getBlogContent(blog)
      const html = converter.makeHtml(content.substring(0,100) + '...');
      return blogObject(html, id);
    }))
  
  return blogListWithExcerpt;
}

async function getBlog(id) {
  const content = await getBlogContent(`post_${id}.md`);
  const html = converter.makeHtml(content);
  return blogObject(html);
}

async function getBlogContent(file) {
  return (await readFile(`${db}/${file}`)).toString();
}

function blogObject(blog, id) {
  const header = blog.match(/^<h1 id=".*">.*<\/h1>/i)[0];
  const title = header.replace(/<h1 id=".*">|<\/h1>/g, '');
  const content = blog.replace(/^<h1 id=".*">.*<\/h1>/i, '');
  return { id, title, content };
}

const nextId = (ids) => {
  const highestId = ids.reduce((a, c) => (c > a ? c : a), 0);
  return Number.parseInt(highestId, 10) + 1;
};

async function createBlog(blog) {
  const { title, content } = blog
  const blogListIds = (await readDir(db))
    .map(blog => blog.replace(/^post_|\.md$/g, ''));

  const id = nextId(blogListIds);
  const fileContent = `# ${title}\n\n${content}`;

  fs.writeFileSync(`${db}/post_${id}.md`, fileContent); 
}

module.exports = { getBlogs, getBlog, createBlog };
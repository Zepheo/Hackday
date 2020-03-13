const fs = require('fs');
const { promisify } = require('util');
const showdown = require('showdown');
const fm = require('front-matter');

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const converter = new showdown.Converter({strikethrough: true});

const db = `${__dirname}/../../db/blogs`;

function sortName(a,b) {
  return (b.replace(/^post_|\.md$/g, '') - a.replace(/^post_|\.md$/g, ''));
  
}

async function getBlogs() {  
  const blogList = (await readDir(db)).sort((a,b) => sortName(a,b));
    const blogListWithExcerpt = await Promise.all(
    blogList.map(async (blog) => {
      // const id = blog.replace(/^post_|\.md$/g, '')
      const content = await getBlogContent(blog)
      return blogObject(content, true)
    }))
  
  return blogListWithExcerpt;
}

async function getBlog(id) {
  const content = await getBlogContent(`post_${id}.md`);
  return blogObject(content, false);
}

async function getBlogEdit(id) {  
  const content = await getBlogContent(`post_${id}.md`);  
  return blogObject(content, false, true);
}

async function getBlogContent(file) {
  return fm((await readFile(`${db}/${file}`)).toString());
}

function blogObject(data, excerpt, edit) {
  const { attributes, body } = data
  const { title, id, edited } = attributes
  const content = excerpt ? converter.makeHtml(body.substring(0, 100) + '...') : edit ? body : converter.makeHtml(body);
  return {
     id,
     title,
     content,
     edited };
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
  const fileContent = `---\ntitle: ${title}\nid: ${id}\nedited: ${false}\n---\n${content}`;

  fs.writeFileSync(`${db}/post_${id}.md`, fileContent); 
}

async function editBlog(blog, id) {
  const { title, content } = blog;

  const fileContent = `---\ntitle: ${title}\nid: ${id}\nedited: ${true}\n---\n${content}`;

  fs.writeFileSync(`${db}/post_${id}.md`, fileContent); 
}

module.exports = { getBlogs, getBlog, createBlog, getBlogEdit, editBlog };
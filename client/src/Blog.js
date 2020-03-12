import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/Blog.css';

export default function Blog() {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    getBlogs()
  }, []);

  const getBlogs = () => {
    axios.get('/api/blogs')
      .then(res => res.data)
      .then(data => setBlogs(data));
  };

  const template = (blog, key) => {
    const { id, title, content } = blog;
    
    return (
      <div className="blog-entry" key={key}>
        <h1 className="blog-entry-title"><Link to={`/blogs/${id}`}>{title}</Link></h1>
        <div className="blog-entry-content" dangerouslySetInnerHTML={{__html: content}}/>
      </div>
    )
  }

  return (
    <section className="blog-list">
      {blogs ?
      blogs.map((blog, i) => template(blog, i)) :
      'Loading...'
      }
    </section>
  )
}

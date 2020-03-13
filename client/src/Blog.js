import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles/Blog.css';

export default function Blog() {
  const [blogs, setBlogs] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getBlogs()
  }, []);

  const getBlogs = () => {
    axios.get('/api/blogs')
      .then(res => res.data)
      .then(data => setBlogs(data));
  };

  const redirect = (id) => {
    history.push(`/blogs/${id}`)
  };

  const template = (blog, key) => {
    const { id, title, content } = blog;
    
    return (
      <div className="blog-entry" key={key} onClick={() => redirect(id)}>
        <h1 className="blog-entry-title">{title}</h1>
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

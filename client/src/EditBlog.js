import React, { useState, useEffect }from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './styles/EditBlog.css';

export default function EditBlog(props) {
  const { url } = props.match;
  const id = url.replace(/^\/blogs\/|\/edit$/g, '');

  const history = useHistory();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlog(id)
  }, [id]);

  const getBlog = (id) => {
    axios.get(`/api/blogs/${id}/edit`)
      .then(res => res.data)
      .then(data => setBlog(data));
  };

  const editBlog = async (e) => {
    e.preventDefault();

    const blogTitle = document.getElementById('title').value;
    const blogContent = document.getElementById('content').value;
    
    if ( blogTitle.length && blogContent.length) {
      const blog = { title: blogTitle, content: blogContent};

      await axios.put(`/api/blogs/${id}`, blog);

      history.push(`/blogs/${id}`);
    } else {
      document.getElementById('title').placeholder = !blogTitle ? 'Cannot be empty' : '';

      document.getElementById('content').placeholder = !blogContent ? 'Cannot be empty' : '';
    }
    
  }

  const display = blog ?
          <form className='edit-blog-form' onSubmit={editBlog}>
            <p className='edit-blog-form-label'>Title:</p>
            <input className='edit-blog-form-title' type='text' id='title' placeholder='Title' defaultValue={blog.title} required/>
            <p className='edit-blog-form-label'>Content:</p>
            <textarea className='edit-blog-form-content' type='text' rows='20' spellCheck='false' id='content' placeholder='Blog content' defaultValue={blog.content} required/>
            <br/>
            <input className='edit-blog-form-btn' type='submit' value='Edit'/>
          </form> :
    'Loading...';

  return (
    <section className='edit-blog'>
      {display}
    </section>
  )
}

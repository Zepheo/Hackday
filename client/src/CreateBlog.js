import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './styles/CreateBlog.css';

export default function CreateBlog() {
  const history = useHistory();

  const createBlog = async (e) => {
    e.preventDefault();
    const blogTitle = document.getElementById('title').value;
    const blogContent = document.getElementById('content').value;
    
    if ( blogTitle.length && blogContent.length) {
      const blog = { title: blogTitle, content: blogContent};
  
      await axios.post('/api/blogs', blog);
      history.push('/blogs');
    } else {
      document.getElementById('title').placeholder = !blogTitle ? 'Cannot be empty' : '';

      document.getElementById('content').placeholder = !blogContent ? 'Cannot be empty' : '';
    }
    
  }

  return (
    <section className='create-blog'>
      <form className='create-blog-form' onSubmit={createBlog}>
        <p className='create-blog-form-label'>Title:</p>
        <input className='create-blog-form-title' type='text' id='title' placeholder='Title' required/>
        <p className='create-blog-form-label'>Content:</p>
        <textarea className='create-blog-form-content' type='text' rows='20' spellCheck='false' id='content' placeholder='Blog content' required/>
        <br/>
        <input className='create-blog-form-btn' type='submit' value='Create'/>
      </form>
    </section>
  )
}

import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function CreateBlog() {
  const history = useHistory();

  async function createBlog() {
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
      <form className='create-blog-form'>
        <p>Title:</p>
        <input type='text' id='title' placeholder='Title'/>
        <p>Content:</p>
        <input type='text' id='content' placeholder='Blog content'/>
        <br/>
        <button type='button' onClick={() => createBlog()}>Create</button>
      </form>
    </section>
  )
}

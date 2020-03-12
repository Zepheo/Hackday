import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/Blogpost.css';

export default function Blogpost(props) {
  const { url } = props.match;
  const id = url.replace('/blogs/', '');
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlog(id)
  }, [id]);

  const getBlog = (id) => {
    axios.get(`/api/blogs/${id}`)
      .then(res => res.data)
      .then(data => setBlog(data));
  };

  const template = (blog) => {
    const { title, content } = blog;
    
    return (
      <>
        <h1 className="blog-post-title">{title}</h1>
        <div className="blog-post-content" dangerouslySetInnerHTML={{__html: content}}/>
        <Link className='blog-post-btn' to={`${url}/edit`}>Edit</Link>
        <Link className='blog-post-btn' to={'/blogs'}>Back to all the posts</Link>
      </>
    )
  }

  return (
    <div className="blog-post" key={id + 1}>
      {
        blog ?
        template(blog) :
        'Loading...'
      }
    </div>
  )
}

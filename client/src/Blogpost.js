import React, { useState, useEffect} from 'react';
import axios from 'axios';

export default function Blogpost(props) {
  const id = props.match.url.replace('/blog/', '');
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
      <div className="blog-post" key={id + 1}>
        <h1 className="blog-post-title">{title}</h1>
        <div className="blog-post-content" dangerouslySetInnerHTML={{__html: content}}/>
      </div>
    )
  }

  return (
    <section className="blog-list">
      {
        blog ?
        template(blog) :
        'Loading...'
      }
    </section>
  )
}

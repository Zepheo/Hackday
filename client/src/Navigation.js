import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navigation.css'

export default function Navigation() {
  return (
    <nav>
      <ul className="nav">
        <li><Link to='/' className="nav-link">Home</Link></li>
        <li><Link to='/blogs' className="nav-link">Blogs</Link></li>
        <li><Link to='/blogs/create' className="nav-link">Create new blog</Link></li>
        <li><Link to='/about' className="nav-link">About</Link></li>
      </ul>
    </nav>
  )
}

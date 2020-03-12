import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <ul className="nav-bar">
        <li className="nav-item"><Link to='/'>Home</Link></li>
        <li className="nav-item"><Link to='/blogs'>Blogs</Link></li>
        <li className="nav-item"><Link to='/blogs/create'>Create new blog</Link></li>
        <li className="nav-item"><Link to='/about'>About</Link></li>
      </ul>
    </nav>
  )
}

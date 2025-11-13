import React from 'react'
import '../styles/nav.css'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <>
    <nav className='nav-bar'>
      <div className='nav-logo'>
        <img src="" alt=""/>  
      </div>
      <div className='nav-links-container'>
        <ul className='nav-links-desktop'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">About</Link></li>
            <li><Link to="/">Menu</Link></li>
            <li><Link to="/">Reservations</Link></li>
            <li><Link to="/">Order Online</Link></li>
            <li><Link to="/"></Link>Login</li>
        </ul>
      </div>
      <div className='nav-menu-icon'>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
      </div>
    </nav>
    <div className='mobile-menu'>
        <ul className='nav-links-mobile'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">About</Link></li>
            <li><Link to="/">Menu</Link></li>
            <li><Link to="/">Reservations</Link></li>
            <li><Link to="/">Order Online</Link></li>
            <li><Link to="/"></Link>Login</li>
        </ul>
    </div>
    </>
  )
}

export default NavBar

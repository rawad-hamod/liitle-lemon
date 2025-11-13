import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo .svg';
import '../styles/nav.css'

const NavBar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(true);
    
    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    }

    const closeMobileMenu = () => {
        setShowMobileMenu(false);
    }

    return (
        <>
            <nav className='nav-bar'>
                <div className='nav-logo'>
                    <img src={logo} alt="Little Lemon logo"/>  
                </div>
                <div className='nav-links-container'>
                    <ul className='nav-links-desktop'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/reservations">Reservations</Link></li>
                        <li><Link to="/order-online">Order Online</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
                <div 
                    className='nav-menu-icon' 
                    onClick={toggleMobileMenu}
                    role="button"
                    aria-label="Toggle menu"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && toggleMobileMenu()}
                >
                    {showMobileMenu ? (
                        <p className="close-icon">×</p>
                    ) : (
                        <>
                            <div className='bar'></div>
                            <div className='bar'></div>
                            <div className='bar'></div>
                        </>
                    )}
                </div>
            </nav>

            <div className={`mobile-menu ${showMobileMenu ? "open" : ""}`}>
                <ul className='nav-links-mobile'>
                    <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
                    <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
                    <li><Link to="/menu" onClick={closeMobileMenu}>Menu</Link></li>
                    <li><Link to="/reservations" onClick={closeMobileMenu}>Reservations</Link></li>
                    <li><Link to="/order-online" onClick={closeMobileMenu}>Order Online</Link></li>
                    <li><Link to="/login" onClick={closeMobileMenu}>Login</Link></li>
                </ul>
            </div>
        </>
    )
}

export default NavBar
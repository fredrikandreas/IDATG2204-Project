import React from 'react';
import './Footer.css';
import logo from '../Assets/Logo.svg'
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-logo'>
                <Link to={'/'}>
                    <img src={logo} alt='nav-logo'/>
                </Link>
            </div>
            <h1>ElectroMart</h1>
            <ul className='footer-list'>
                <li><Link className='footer-link' to={'/'}><h3>Products</h3></Link></li>
                <li><Link className='footer-link' to={'/search'}><h3>Search</h3></Link></li>
                <li><Link className='footer-link' to={'/cart'}><h3>Cart</h3></Link></li>
                <li><Link className='footer-link' to={'/login'}><h3>Login</h3></Link></li>
                <li><Link className='footer-link' to={'/register'}><h3>Register</h3></Link></li>
            </ul>
            <h3>Copyright © 2025 - All Rights Reserved</h3>
        </div>
    )
}

export default Footer;
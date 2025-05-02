import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/Logo.svg';
import Button from '../Button/Button';
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
    const [menu, setMenu] = useState('products');
    const location = useLocation();

    useEffect(() => {
        // Update menu based on the current path
        const path = location.pathname;
        if (path === '/') {
            setMenu('products');
        } else if (path === '/search') {
            setMenu('search');
        } else if (path === '/cart') {
            setMenu('cart');
        } else if (path === '/login') {
            setMenu('login');
        }  else if (path === '/register') {
            setMenu('register');
        }
    }, [location]);

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <Link to={'/'}>
                    <img src={logo} alt='nav-logo'/>
                </Link>
            </div>
            <div className='nav-menu'>
                <ul className='nav-list'>
                    <li>
                        <Link className={menu === 'products' ? 'nav-link current-page' : 'nav-link'} to={'/'}>Products</Link>
                    </li>
                    <li>
                        <Link className={menu === 'search' ? 'nav-link current-page' : 'nav-link'} to={'/search'}>Search</Link>
                    </li>
                    <li>
                        <Link className={menu === 'cart' ? 'nav-link current-page' : 'nav-link'} to={'/cart'}>Cart</Link>
                        <div className="nav-cart-count">0</div>
                    </li>
                </ul>
                <div className='nav-login'>
                    <Button type='light' text='Login' path='/login'/>
                    <Button type='dark' text='Register' path='/register'/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

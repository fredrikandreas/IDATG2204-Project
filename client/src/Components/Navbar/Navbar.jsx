import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/Logo.svg';
import Button from '../Button/Button';
import {Link, Navigate, useLocation} from "react-router-dom";
import { logout, isLoggedIn } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
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
                    <h1 className='nav-logo-text'>ElectroMart</h1>
                </Link>
            </div>

            <div className='nav-menu'>
                <ul className='nav-list'>
                    <li>
                        <Link className={menu === 'products' ? 'nav-link current-page' : 'nav-link'} to={'/'}><h3>Products</h3></Link>
                    </li>
                    <li>
                        <Link className={menu === 'search' ? 'nav-link current-page' : 'nav-link'} to={'/search'}><h3>Search</h3></Link>
                    </li>
                    <li>
                        <Link className={menu === 'cart' ? 'nav-link current-page' : 'nav-link'} to={'/cart'}><h3>Cart</h3></Link>
                        <div className="nav-cart-count">0</div>
                    </li>
                </ul>
                <div className='nav-login'>
                    {isLoggedIn() ? (
                        <Button text="Logout" onClick={() => logout(navigate)} />
                    ) : (
                        <>
                             <Button type='light' text='Login' path='/login' />
                             <Button type='dark' text='Register' path='/register' />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

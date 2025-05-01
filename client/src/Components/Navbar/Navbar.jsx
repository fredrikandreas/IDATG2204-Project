import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/Logo.svg';
import Button from '../Button/Button';

const Navbar = () => {
    const [menu, setMenu] = useState('products');

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <a href=''>
                    <img src={logo} alt='nav-logo' />
                </a>
            </div>
            <div className='nav-menu'>
                <ul className='nav-list'>
                    <li
                        onClick={() => {
                            setMenu('products');
                        }}
                        className={menu === 'products' ? 'current-page' : ''}
                    >
                        Products
                    </li>
                    <li
                        onClick={() => {
                            setMenu('search');
                        }}
                        className={menu === 'search' ? 'current-page' : ''}
                    >
                        Search
                    </li>
                    <li
                        onClick={() => {
                            setMenu('cart');
                        }}
                        className={menu === 'cart' ? 'current-page' : ''}
                    >
                        Cart
                    </li>
                </ul>
                <div className='nav-login'>
                    <Button type='light' text='Login' />
                    <Button type='dark' text='Register' />
                </div>
            </div>
        </div>
    );
};

export default Navbar;

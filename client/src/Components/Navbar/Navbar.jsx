import React, {Component} from 'react';
import './Navbar.css';
import logo from '../Assets/Logo.svg';

class Navbar extends Component {
    render() {
        return (
            <div className='navbar'>
                <div className='nav-logo'>
                    <a href=''>
                        <img src={logo} alt='nav-logo'/>
                    </a>
                </div>
                <div className="nav-menu">
                    <ul className='nav-list'>
                        <li><a className='nav-list-link current-page' href=''>Products</a></li>
                        <li><a className='nav-list-link' href=''>Search</a></li>
                        <li><a className='nav-list-link' href=''>Cart</a></li>
                    </ul>
                    <div className="nav-login">
                        <button>Login</button>
                        <button>Register</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
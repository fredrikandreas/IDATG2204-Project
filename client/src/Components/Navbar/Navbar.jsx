import React, {Component} from 'react';
import './Navbar.css';
import logo from '../Assets/Logo.svg';

class Navbar extends Component {
    render() {
        return (
            <div className='navbar'>
                <div className='nav-logo'>
                    <button className='logo-button'>
                        <img src={logo} alt='nav-logo'/>
                    </button>
                </div>
                <div className="nav-menu">
                    <ul className='nav-list'>
                        <li><button className='nav-list-link current-page'>Products</button></li>
                        <li><button className='nav-list-link'>Search</button></li>
                        <li><button className='nav-list-link'>Cart</button></li>
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

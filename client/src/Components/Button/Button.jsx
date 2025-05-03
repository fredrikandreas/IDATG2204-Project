import React from 'react';
import './Button.css';
import {useNavigate} from 'react-router-dom';

const Button = ({ type, text, path }) => {
    const navigate = useNavigate();
    const className = type === 'dark' ? 'dark' : 'light';

    return (
        <button className={className} onClick={() => {
            navigate(path);
        }}>
            <h3>{text}</h3>
        </button>
    );
};

export default Button;

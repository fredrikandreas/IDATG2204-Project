import React from 'react';
import './Button.css';

const Button = ({ type, text }) => {
    const className = type === 'dark' ? 'dark' : 'light';

    return (
        <button className={className}>
            {text}
        </button>
    );
};

export default Button;

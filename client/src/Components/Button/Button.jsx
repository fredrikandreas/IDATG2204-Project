import React from 'react';
import './Button.css';
import {useNavigate} from 'react-router-dom';

const Button = ({ type, text, path, onClick }) => {
    const navigate = useNavigate();
    const className = type === 'dark' ? 'dark' : 'light';

    const handleClick = () => {
        if (onClick) {
          onClick();             
        } else if (path) {
          navigate(path);        
        }
      };
    return (
        <button className={className} onClick={handleClick}>
        <h3>{text}</h3>
      </button>
    );
};

export default Button;

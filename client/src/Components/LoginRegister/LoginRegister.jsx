import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import './LoginRegister.css';

const LoginRegister = ({ mode }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('http://localhost:5050/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        setLoading(false);
        if (res.ok && data.token) {
            localStorage.setItem('token', data.token);
            setError(false);
            setMessage('Login successful!');
            setUsername('');
            setPassword('');
            navigate('/');
        } else {
            setError(true);
            setMessage(data.error || 'Login failed!');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5050/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (res.ok) {
            setError(false);
            setMessage('Registration successful!');
            await handleLogin(e);
        } else {
            setError(true);
            setMessage(data.message || 'Registration failed!');
        }
    };

    return (
        <div className="login-container">
            <h1>{mode === 'register' ? 'Register' : 'Login'}</h1>
            <form className={"login-form"} onSubmit={mode === 'register' ? handleRegister : handleLogin}>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    <h3>
                        {loading ? (mode === 'register' ? 'Registering...' : 'Logging in...') : (mode === 'register' ? 'Register' : 'Login')}
                    </h3>
                </button>
            </form>
            <h3 style={{color: error ? 'red' : 'green'}}>{message}</h3>
        </div>
    );
};

export default LoginRegister;

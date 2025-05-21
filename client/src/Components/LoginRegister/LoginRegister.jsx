import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import './LoginRegister.css';
import {loginUser} from "../../utils/loginUser";
import {registerUser} from "../../utils/registerUser";

const LoginRegister = ({ mode }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
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
        const { ok, data } = await loginUser(username, password);
        setLoading(false);
        if (ok && data.token) {
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
        setLoading(true);
        const { ok, data } = await registerUser(username, password, email);
        setLoading(false);
        if (ok) {
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
                <input
                    style={{display: mode === 'register' ? 'block' : 'none'}}
                    disabled={mode === 'login'}
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

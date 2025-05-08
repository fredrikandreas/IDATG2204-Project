import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);
// Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // send POST request to the server with username and password
    const res = await fetch('http://localhost:5050/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setLoading(false);
    // Parse the response
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      setMessage('Login successful!');
      setUsername('');
      setPassword('');
      navigate('/'); 
    } else {
      setMessage(` ${data.error || 'Login failed'}`);
    }
  };
// Render the login form
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;

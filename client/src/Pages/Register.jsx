import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const Register = () => {
  const navigate = useNavigate();
  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  }, []);
  // State variables for username, password, and message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    // send POST request to the server with username and password
    const res = await fetch('http://localhost:5050/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    // Parse the response
    const data = await res.json();
    if (res.ok) {
      setMessage(' Registered successfully!');
      setUsername('');
      setPassword('');
      navigate('/login');
    } else {
      setMessage(` ${data.message || 'Registration failed'}`);
    }
  };
  // Render the registration form
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;

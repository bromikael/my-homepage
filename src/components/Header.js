import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Header.css'; // Make sure to style your header as needed

const Header = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  

  // Handle the login process
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error message

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          email,
          password,
        });
        console.log('User registered:', res.data);
      } catch (error) {
        console.error('Error registering user:', error);
      }

      const data = await response.json();

      if (response.ok) {
        // Save the JWT token to localStorage
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setEmail('');
        setPassword('');
      } else {
        // Handle error response from server
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Server error. Please try again later.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error message

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          email,
          password,
        });
        console.log('User registered:', res.data);
      } catch (error) {
        console.error('Error registering user:', error);
      }

      const data = await response.json();

      if (response.ok) {
        // Save the JWT token to localStorage
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setEmail('');
        setPassword('');
      } else {
        // Handle error response from server
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Server error. Please try again later.');
    }
  };

  // Handle logout process
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <h1>My Portfolio</h1>
      
      {!isLoggedIn ? (
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
      ) : (
        <div className="logout-section">
          <p>Welcome back!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

    <form className="register-form" onSubmit={handleRegister}>
      <button type="submit">Register</button>
    </form>
    </header>
  );
};

export default Header;
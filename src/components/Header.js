import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { register, login } from '../services/AuthService';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (credentials) => {
    try {
      const data = await register(credentials.email, credentials.password);
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message || 'Invalid credentials');
      } else {
        setErrorMessage('Server error. Please try again later.');
      }
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials.email, credentials.password);
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message || 'Invalid credentials');
      } else {
        setErrorMessage('Server error. Please try again later.');
      }
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };


  return (
    <header className="header">
      <h1>My Portfolio</h1>
      {!isLoggedIn ? (
        <div className='login'>
          <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
          <RegisterForm onRegister={handleRegister} errorMessage={errorMessage} />
        </div>
      ) : (
        <div className="logout-section">
          <p>Welcome back!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import LoginForm from './LoginForm'; 
import RegisterForm from './RegisterForm';
import { login, register, setToken } from '../services/ApiService';
import '../styles/LandingPage.css'; 

function LandingPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials.email, credentials.password);
      console.log('Token created:', data.token);
      setToken(data.token);
      setIsLoggedIn(true);
      setErrorMessage('');
      onLoginSuccess();
    } catch (error) {
      setErrorMessage(handleError(error));
    }
  };

  const handleRegister = async (credentials) => {
    try {
      const data = await register(credentials.email, credentials.password);
      console.log('Token :', data.token);
      setToken(data.token); 
      setIsLoggedIn(true);
      setErrorMessage('');
      onLoginSuccess();
    } catch (error) {
      setErrorMessage(handleError(error));
    }
  };

  const handleError = (error) => {
    if (error.response && error.response.status === 400) {
      return error.response.data.message || 'Invalid credentials';
    } else {
      return 'Server error. Please try again later.';
    }
  }

  return (
    <div className="landing-page">
      <div className="slider">
        {/* Switch buttons */}
        <button
          className={`slider-button ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`slider-button ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>

        {/* Conditionally render Login or Register form based on isLogin state */}
        <div className="form-container">
          {isLogin ? (
            <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
          ) : (
            <RegisterForm onRegister={handleRegister} errorMessage={errorMessage} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

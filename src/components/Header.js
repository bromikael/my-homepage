import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <h1>John Doe</h1> {/* Your name or logo */}
      </div>
      <div className="login">
        <button className="login-btn">Login</button>
        {/* Alternatively, you can add a login form here */}
        {/* 
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        */}
      </div>
    </header>
  );
}

export default Header;

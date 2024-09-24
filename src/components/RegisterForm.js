import React, { useState } from 'react';

const RegisterForm = ({ onRegister, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <button type="submit">Register</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

export default RegisterForm;

import React, { useState, useEffect } from 'react';
import './AuthStyles.css'; 
const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // password reset logic here
    console.log(email); 
  };

  useEffect(() => {
    // Set the title of the tab when the component mounts
    document.title = "Password Reset";
  }, []); 

  return (
    <div className="auth-container"> 
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email" className="label">Email:</label>
        <input
          type="email"
          id="email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="button">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordReset;


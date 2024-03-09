import { useState, useEffect } from 'react';
import './AuthStyles.css'; 

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    useEffect(() => {
      // Set the title of the tab when the component mounts
      document.title = "SCS Login";
    }, []); 

    const handleChange = (event) => {
      const { name, value } = event.target;
      setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      // Implement login logic here
    };

    return (
      <div className="auth-container">
        <h1>Welcome to the Supervised Consumption Sites Web System</h1> {/* Title */}
        <h2>Login</h2>
        <br></br>
        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="username" className="label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="input-field"
            value={credentials.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" className="label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="button">Log In</button>
        </form>
      </div>
    );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import '../styles/Auth.css';

function Login({ setLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await login(username, password);
            localStorage.setItem('user', JSON.stringify(user)); 
            setLoggedIn(true);

            // Check the role_id and navigate accordingly
            const role_id = user?.user?.role_id;
            if (role_id === 2) {
                navigate('/powerbi-report'); // Redirect role_id 2 to Power BI Report
            } else {
                navigate('/form-list'); // Redirect all other roles to Forms
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        document.title = "Login"; // Sets the page title
    }, []); 

    return (
        <div>
            <div className='auth-container'>
                <h1>Welcome to the Supervised Consumption Sites Web System</h1>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor='username' className='label'>Username</label>
                        <input
                            type='text'
                            placeholder='Username'
                            id='username'
                            name='username'
                            value={username}
                            className='input-field'
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor='password' className='label'>Password</label>
                        <input
                            type='password'
                            placeholder='Password'
                            id='password'
                            name='password'
                            className='input-field'
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type='submit' className='button'>Log In</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}

export default Login;

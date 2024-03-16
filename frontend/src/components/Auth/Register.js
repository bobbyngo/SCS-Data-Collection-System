import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import '../styles/Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [siteId, setSiteId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [siteIdError, setSiteIdError] = useState('');
    const [roleIdError, setRoleIdError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        // Reset previous errors
        setUsernameError('');
        setEmailError('');
        setSiteIdError('');
        setRoleIdError('');
        setError('');

        // Form validation
        if (!username.trim()) {
            setUsernameError('Username is required');
            return;
        }

        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }

        if (!siteId.trim()) {
            setSiteIdError('Site ID is required');
            return;
        }

        if (!roleId.trim()) {
            setRoleIdError('Role ID is required');
            return;
        }

        if (!password.trim()) {
            setError('Password is required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register(username, password, email, siteId, roleId);
            // Redirect or perform any necessary actions after successful registration
            navigate('/signin');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message;
                if (errorMessage.includes('username')) {
                    setUsernameError(errorMessage);
                } else if (errorMessage.includes('email')) {
                    setEmailError(errorMessage);
                } else {
                    setError(errorMessage);
                }
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className='register-container'>
            <h2>Register New User</h2>
            <form onSubmit={handleRegister}>
                <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type='text'
                        id='username'
                        placeholder='Enter your username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameError && (
                        <p className='error-message'>{usernameError}</p>
                    )}
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                        <p className='error-message'>{emailError}</p>
                    )}
                </div>
                <div className='form-group'>
                    <label htmlFor='siteId'>Site ID:</label>
                    <input
                        type='number'
                        id='siteId'
                        placeholder='Enter your site ID'
                        value={siteId}
                        onChange={(e) => setSiteId(e.target.value)}
                    />
                    {siteIdError && (
                        <p className='error-message'>{siteIdError}</p>
                    )}
                </div>
                <div className='form-group'>
                    <label htmlFor='roleId'>Role ID:</label>
                    <input
                        type='number'
                        id='roleId'
                        placeholder='Enter your role ID'
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                    />
                    {roleIdError && (
                        <p className='error-message'>{roleIdError}</p>
                    )}
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <p className='error-message'>{error}</p>}
                </div>
                <button type='submit' className='register-button'>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;

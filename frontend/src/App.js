import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import FormList from './components/Form/FormList';
import FormDetail from './components/Form/FormDetail';
import Submissions from './components/Form/Submissions'; 
import PrivateRoute from './components/Auth/PrivateRoute';
import PowerBIEmbed from './components/PowerBI/PowerBIEmbed';
import LandingPage from './components/LandingPage/LandingPage';
import FormListUser from './components/Form/FormListUser';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by looking for the user data in local storage
        const user = JSON.parse(localStorage.getItem('user'));
        setIsLoggedIn(!!user); // Set isLoggedIn to true if user data is found, otherwise false
    }, []);

    const getUserRole = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.role : null; // Adjust 'role' based on your API response
    };
    
    const isAdmin = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.role_id === 0; // Admin identified by role_id 0
    };
    
    const isSiteRole = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.role_id !== 0; // Non-admin roles
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path='/signin' element={<Login setLoggedIn={setIsLoggedIn} />} />
                <Route path='/registration' element={<PrivateRoute isLoggedIn={isLoggedIn}><Register /></PrivateRoute>} />

                {isAdmin() && (
                    <>
                        <Route path='/form-list' element={<PrivateRoute isLoggedIn={isLoggedIn}><FormList /></PrivateRoute>} />
                        <Route path='/form/:formId' element={<PrivateRoute isLoggedIn={isLoggedIn}><FormDetail /></PrivateRoute>} />
                        <Route path='/submissions/:formId' element={<PrivateRoute isLoggedIn={isLoggedIn}><Submissions /></PrivateRoute>} />
                        <Route path='/powerbi-report' element={<PrivateRoute isLoggedIn={isLoggedIn}><PowerBIEmbed /></PrivateRoute>} />
                    </>
                )}

                {isSiteRole() && (
                    <Route path='/form-list-user' element={<PrivateRoute isLoggedIn={isLoggedIn}><FormListUser /></PrivateRoute>} />
                )}
            </Routes>
        </Router>
    );
}

export default App;

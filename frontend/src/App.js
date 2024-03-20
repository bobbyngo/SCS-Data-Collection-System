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
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Check if the user is logged in by looking for the user data in local storage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setUserRole(user.role_id); // Set the user role state
        } else {
            setIsLoggedIn(false);
            setUserRole(null); // Clear the user role state
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path='/signin' element={<Login setLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
                <Route path='/registration' element={<PrivateRoute isLoggedIn={isLoggedIn}><Register /></PrivateRoute>} />

                {userRole === 0 && (
                    // Admin routes
                    <>
                        <Route path='/form-list' element={<PrivateRoute isLoggedIn={isLoggedIn}><FormList /></PrivateRoute>} />
                        <Route path='/form/:formId' element={<PrivateRoute isLoggedIn={isLoggedIn}><FormDetail /></PrivateRoute>} />
                        <Route path='/submissions/:formId' element={<PrivateRoute isLoggedIn={isLoggedIn}><Submissions /></PrivateRoute>} />
                        <Route path='/powerbi-report' element={<PrivateRoute isLoggedIn={isLoggedIn}><PowerBIEmbed /></PrivateRoute>} />
                    </>
                )}

                {userRole !== 0 && (
                    // Site role routes
                    <Route path='/form-list-user' element={<PrivateRoute isLoggedIn={isLoggedIn}><FormListUser /></PrivateRoute>} />
                )}
            </Routes>
        </Router>
    );
}

export default App;

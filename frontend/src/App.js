import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import FormList from './components/Form/FormList';
import FormDetail from './components/Form/FormDetail';
import Submissions from './components/Form/Submissions'; // Import the Submissions component
import PrivateRoute from './components/Auth/PrivateRoute';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by looking for the user data in local storage
        const user = JSON.parse(localStorage.getItem('user'));
        setIsLoggedIn(!!user); // Set isLoggedIn to true if user data is found, otherwise false
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                    path='/signin'
                    element={<Login setLoggedIn={setIsLoggedIn} />}
                />
                <Route
                    path='/registration'
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <Register />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/form-list'
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <FormList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/form/:formId'
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <FormDetail />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/submissions/:formId'
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <Submissions />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;

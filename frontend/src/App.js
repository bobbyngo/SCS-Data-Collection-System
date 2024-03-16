import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormList from './components/Form/FormList';
import FormDetail from './components/Form/FormDetail';
import PrivateRoute from './components/Auth/PrivateRoute';

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
                ></Route>
                <Route
                    path='/form-list'
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <FormList />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path='/form/:formId'
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <FormDetail />
                        </PrivateRoute>
                    }
                ></Route>
            </Routes>
        </Router>
    );
}

export default App;

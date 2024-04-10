import { Route, Navigate } from 'react-router-dom';
import NavBar from '../Navbar';

function PrivateRoute({ isLoggedIn, children }) {
    return isLoggedIn ? (
        <>
            <NavBar />
            {children}
        </>
    ) : (
        <Navigate to='/signin' />
    );
}

export default PrivateRoute;

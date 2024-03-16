import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/NavBar.css';

function NavBar() {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await axios.post('http://localhost:4000/api/auth/signout', {
                withCredentials: true,
            });
            localStorage.removeItem('user');
            navigate('/signin');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to='/registration'>Registration</Link>
                </li>
                <li>
                    <Link to='/form-list'>Forms</Link>
                </li>
                <li>
                    <button onClick={handleSignOut}>Sign Out</button>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;

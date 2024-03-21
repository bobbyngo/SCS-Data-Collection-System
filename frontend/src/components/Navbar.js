import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/NavBar.css';

function NavBar() {
    const navigate = useNavigate();

    // Retrieve the user's role_id from local storage
    const getRoleId = () => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            return null;
        }
        try {
            const user = JSON.parse(userData);
            return user.user.role_id;
        } catch (error) {
            console.error("Error parsing user data:", error);
            return null;
        }
    };

    const role_id = getRoleId();

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
                {/* Home is visible to all users */}
                <li>
                    <Link to='/'>Home</Link>
                </li>

                {/* Forms link is visible to role_id 0, 1, 3, 4 */}
                {(role_id === 0 || role_id === 1 || role_id === 3 || role_id === 4) && (
                    <li>
                        <Link to='/form-list'>Forms</Link>
                    </li>
                )}

                {/* Registration link is visible to role_id 0 */}
                {role_id === 0 && (
                    <li>
                        <Link to='/registration'>Registration</Link>
                    </li>
                )}

                {/* Power BI Report link is visible to role_id 0, 1, 2, 3 */}
                {(role_id === 0 || role_id === 1 || role_id === 2 || role_id === 3) && (
                    <li>
                        <Link to='/powerbi-report'>Power BI Report</Link>
                    </li>
                )}

                {/* Additional PowerBI link is visible to role_id 3 */}
                {role_id === 3 && (
                    <li>
                        <Link to='/powerbi-report-site'>PowerBI</Link>
                    </li>
                )}

                {/* Sign Out is visible to all users */}
                <li>
                    <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;

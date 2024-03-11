import { Link } from 'react-router-dom';
import './styles/NavBar.css';

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Login</Link>
                </li>
                <li>
                    <Link to='/Registration'>Registration</Link>
                </li>
                <li>
                    <Link to='/forms'>Forms</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;

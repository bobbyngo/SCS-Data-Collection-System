import { Link } from 'react-router-dom';
import './styles/NavBar.css';

function NavBar() {
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
                    <Link to='/signout'>Signout</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;

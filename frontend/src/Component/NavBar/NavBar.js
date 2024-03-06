import { Link } from 'react-router-dom';
import './NavBar.css'; // Adjust the CSS path if necessary

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/PasswordReset">Password Reset</Link></li>
        {/*<li><Link to="/NewPassword">New Password</Link></li> */}
        <li><Link to="/Registration">Registration</Link></li>
        <li><Link to="/ClientIntakeForm">Client Intake Form</Link></li>
        <li><Link to="/IncidentReportForm">Incident Report Form</Link></li>
        <li><Link to="/ReferralForm">Referral Form</Link></li>
        <li><Link to="/QuestionForm">Create New Form</Link></li>
        <li><Link to="/ClientForm">Edit Default Form</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;

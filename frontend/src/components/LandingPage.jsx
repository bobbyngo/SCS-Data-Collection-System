const LandingPage = ({ onRoleSelect }) => {
    return (
      <div>
        <h1>Welcome to the Site</h1>
        <button onClick={() => onRoleSelect('admin')}>Admin</button>
        <button onClick={() => onRoleSelect('employee')}>Employee</button>
      </div>
    );
  };
  
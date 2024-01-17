import React, { useState } from 'react';
import FormSelectionComponent from './components/FormSelectionComponent.jsx';
import SurveyComponent from './components/SurveyComponent/SurveyComponent.jsx';

const App = () => {
  const [currentFormId, setCurrentFormId] = useState(null);
  const [userRole, setUserRole] = useState(null); // State to track the user role
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false); // State to track if edit mode is enabled

  const handleFormSelect = (formId) => {
    setCurrentFormId(formId);
  };

  const handleBack = () => {
    setCurrentFormId(null); // Resets to show form selection
    setUserRole(null); // Also reset the user role to re-display the landing page
  };

  const handleRoleSelect = (role) => {
    setUserRole(role); // Sets the user role
    setIsEditModeEnabled(role === 'admin'); // Enable edit mode only for admin
  };

  // If no role is selected, show the landing page
  if (!userRole) {
    return (
      <div className="landing-page">
        <h1>Welcome to the SCS Web Data System</h1>
        <h3>Log In:</h3>
        <button onClick={() => handleRoleSelect('admin')}>Site Admin</button>
        <button onClick={() => handleRoleSelect('employee')}>Employee</button>
      </div>
    );
  }

  // User has selected a role, show the form selection or the survey
  return (
    <div className="App">
      {currentFormId ? (
        <SurveyComponent 
          formId={currentFormId} 
          onBack={handleBack} 
          isEditModeEnabled={isEditModeEnabled} // Pass the edit mode state to the SurveyComponent
        />
      ) : (
        <FormSelectionComponent onFormSelect={handleFormSelect} />
      )}
    </div>
  );
};

export default App;

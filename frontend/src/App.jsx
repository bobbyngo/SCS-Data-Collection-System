import React, { useState } from 'react';
import FormSelectionComponent from './components/FormSelectionComponent.jsx';
import SurveyComponent from './components/SurveyComponent/SurveyComponent.jsx';

const App = () => {
    const [currentFormId, setCurrentFormId] = useState(null);
  
    const handleFormSelect = (formId) => {
      setCurrentFormId(formId);
    };
  
    const handleBack = () => {
      setCurrentFormId(null); // Resets to show form selection
    };
  
    return (
      <div className="App">
        {currentFormId ? (
          <SurveyComponent formId={currentFormId} onBack={handleBack} />
        ) : (
          <FormSelectionComponent onFormSelect={handleFormSelect} />
        )}
      </div>
    );
  };
  
  export default App;
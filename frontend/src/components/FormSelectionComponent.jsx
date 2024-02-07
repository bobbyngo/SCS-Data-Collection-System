import React from 'react';

const FormSelectionComponent = ({ onFormSelect }) => {
  const forms = [
    { id: 'form1', name: 'SCS Client Data Form' },
    { id: 'form2', name: 'Mental Health Resource Form' },
    { id: 'form3', name: 'Survey Form 3' },
    { id: 'form4', name: 'Survey Form 4' },
    
  ];

  return (
    <div>
      <h2>Select a Form</h2>
      <ul>
        {forms.map(form => (
          <li key={form.id}>
            <button onClick={() => onFormSelect(form.id)}>
              {form.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormSelectionComponent;

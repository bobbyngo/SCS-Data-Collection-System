import React from 'react';

const FormSelectionComponent = ({ onFormSelect }) => {
  const forms = [
    { id: 'form1', name: 'Survey Form 1' },
    { id: 'form2', name: 'Survey Form 2' },
    // Add more forms as needed
  ];

  return (
    <div>
      <h2>Select a Survey Form</h2>
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

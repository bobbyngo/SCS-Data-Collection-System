import React from "react";
import { useFormik } from "formik";
import formFields from "../formFields"; // Adjust the path as necessary

const validate = (values) => {
  const errors = {};
  formFields.forEach(field => {
    // Check if the field is required and empty
    if (field.required && !values[field.name]) {
      errors[field.name] = `${field.placeholder} is required`;
    }
    // Check for maximum length
    else if (field.maxLength && values[field.name].length > field.maxLength) {
      errors[field.name] = `Must be ${field.maxLength} characters or less`;
    }
    // Check for minimum length
    else if (field.minLength && values[field.name].length < field.minLength) {
      errors[field.name] = `Must be at least ${field.minLength} characters long`;
    }
    // Check for regex pattern (e.g., email validation)
    else if (field.validationRegex && !field.validationRegex.test(values[field.name])) {
      errors[field.name] = `Invalid ${field.placeholder.toLowerCase()}`;
    }
  });
  return errors;
};

//Function for sending values to backend
/*function submitForm(values) {
  fetch('example backend x', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
}*/

function FormSection() {
  const formik = useFormik({
    initialValues: formFields.reduce((values, field) => {
      values[field.name] = field.initialValue || '';
      return values;
    }, {}),
    validate,
    onSubmit: (values) => {
      if (Object.keys(formik.errors).length === 0) {
        //submitForm(values);
        console.log("Submitted form data:", values)
      } else {
        alert('Please correct the errors before submitting.');
      }
    },
  });
  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={formik.handleSubmit} style={{ margin: '0 auto', maxWidth: '800px' }}>
        {formFields.map(field => (
          <div key={field.name} style={{ marginBottom: '15px' }}>
            <label htmlFor={field.name} style={{ display: 'block', marginBottom: '5px' }}>{field.placeholder}</label>
            <input
              type={field.type || "text"}
              placeholder={field.placeholder}
              name={field.name}
              id={field.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field.name]}
              style={{
                width: '100%', // Make input width 100% of the form container
                padding: '10px',
                boxSizing: 'border-box', // Include padding in width calculation
                border: '1px solid #ccc',
                borderRadius: '4px',
                display: 'block' // Ensure input is a block-level element
              }}
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <div className="error" style={{ color: 'red', marginTop: '5px' }}>{formik.errors[field.name]}</div>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="submit-btn"
          style={{
            width: '100%', // Make button width 100% of the form container
            padding: '15px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Sign Up Client
        </button>
      </form>
    </div>
  );
}

export default FormSection;
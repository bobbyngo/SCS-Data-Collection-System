import React from 'react';
import { useState, useEffect } from 'react';
import jsonData from './clientintakeform.json';
import './form.css';

const ClientIntakeForm = () => {
  const [language, setLanguage] = useState('en');
  
  useEffect(() => {
    // Set the title of the tab when the component mounts
    document.title = "Client Intake Form";
  }, []); 
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  // Function to render form elements based on their type
  const renderElement = (element) => {
    let label = language === 'en' ? element.properties.titleEn : element.properties.titleFr;
    let placeholder = language === 'en' ? element.properties.descriptionEn : element.properties.descriptionFr;

    switch (element.type) {
      case 'textField':
        return (
          <div key={element.id} className="form-group">
            <label>{label}</label>
            <input type="text" placeholder={placeholder} required={element.properties.validation.required} />
          </div>
        );
      case 'checkbox':
        return (
          <div key={element.id} className="form-group">
            <label>{label}</label>
            {element.properties.choices.map((choice, index) => (
              <div key={index}>
                <input type="checkbox" id={`${element.id}_${index}`} />
                <label htmlFor={`${element.id}_${index}`}>{language === 'en' ? choice.en : choice.fr}</label>
              </div>
            ))}
          </div>
        );
      case 'dropdown':
        return (
          <div key={element.id} className="form-group">
            <label>{label}</label>
            <select required={element.properties.validation.required}>
              {element.properties.choices.map((choice, index) => (
                <option key={index} value={language === 'en' ? choice.en : choice.fr}>{language === 'en' ? choice.en : choice.fr}</option>
              ))}
            </select>
          </div>
        );
      case 'radio':
        return (
          <div key={element.id} className="form-group">
            <label>{label}</label>
            {element.properties.choices.map((choice, index) => (
              <div key={index}>
                <input type="radio" name={element.id} id={`${element.id}_${index}`} />
                <label htmlFor={`${element.id}_${index}`}>{language === 'en' ? choice.en : choice.fr}</label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <h1>{language === 'en' ? jsonData.titleEn : jsonData.titleFr}</h1>
      <p>{language === 'en' ? jsonData.introduction.descriptionEn : jsonData.introduction.descriptionFr}</p>
      <button onClick={toggleLanguage} className="language-toggle">{language === 'en' ? 'Français' : 'English'}</button>
      <form>
        {jsonData.elements.map(renderElement)}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
  }

export default ClientIntakeForm;

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SignupForm() {
  // Existing state
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [substanceType, setSubstanceType] = useState('');
  const [routeOfAdministration, setRouteOfAdministration] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(0); 
  const [medicalAssistance, setMedicalAssistance] = useState(false);
  const [overdose, setOverdose] = useState(false);
  const [allergicReactions, setAllergicReactions] = useState('');
  const [generalComments, setGeneralComments] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  // Handler for the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here send data to the backend 
    console.log({ name, age, gender, location });
  };
  
  const handleLanguageToggle = () => {
    
    console.log('Language toggle clicked');
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <header>
        {/* ... header content */}
      </header>
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div>
            <h2>Basic Personal Information</h2>
            <div>
              <label htmlFor="name">Name: </label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="age">Age*: </label>
              <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="gender">Gender*: </label>
              <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <button type="button" onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2>Date/Location</h2>
            <div>
              <label htmlFor="location">Location*: </label>
              <select id="location" value={location} onChange={(e) => setLocation(e.target.value)} required>
                <option value="">Select Location</option>
                <option value="kanata">Kanata</option>
                <option value="downtown">Downtown</option>
                <option value="glebe">Glebe</option>
              </select>
            </div>
            <div>
              <label htmlFor="date">Date*: </label>
              <DatePicker selected={date} onChange={(date) => setDate(date)} required />
            </div>
            <div>
              <label htmlFor="time">Time*: </label>
              <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
            <div>
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2>Medical Information</h2>
            <div>
              <label htmlFor="substanceType">Type of Substance*: </label>
              <input
                type="text"
                id="substanceType"
                value={substanceType}
                onChange={(e) => setSubstanceType(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="routeOfAdministration">Route of Administration*: </label>
              <input
                type="text"
                id="routeOfAdministration"
                value={routeOfAdministration}
                onChange={(e) => setRouteOfAdministration(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="allegicReactions">Allergic Reactions*: </label>
              <input
                type="text"
                id="allergicReactions"
                value={routeOfAdministration}
                onChange={(e) => allergicReactions(e.target.value)}
                required
              />
            </div>
            /* add the other medical fields */
            <div>
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2>General Comments</h2>
            <div>
              <label htmlFor="generalComments">General Comments: </label>
              <textarea
                id="generalComments"
                value={generalComments}
                onChange={(e) => setGeneralComments(e.target.value)}
              />
            </div>
            <div>
              <button type="button" onClick={prevStep}>Back</button>
              <button type="submit">Submit</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default SignupForm;

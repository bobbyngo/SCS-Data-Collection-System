import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SignupForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [substanceType, setSubstanceType] = useState('');
  const [routeOfAdministration, setRouteOfAdministration] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(30); // Example default duration
  const [medicalAssistance, setMedicalAssistance] = useState(false);
  const [overdose, setOverdose] = useState(false);
  const [allergicReactions, setAllergicReactions] = useState('');
  const [generalComments, setGeneralComments] = useState('');

  // Handler for the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here send data to the backend 
    console.log({ name, age, gender, location });
  };

  // Handler to toggle the language (not implemented yet)
  const handleLanguageToggle = () => {
    
    console.log('Language toggle clicked');
  };

  return (
    <div>
      <header>
        <h1>SCS Client Signup</h1>
        <button onClick={handleLanguageToggle} style={{ position: 'absolute', top: '20px', right: '20px' }}>
          French
        </button>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name (Optional): </label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="age">Age (Mandatory): </label>
          <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="gender">Gender (Mandatory): </label>
          <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="location">Location (Mandatory): </label>
          <select id="location" value={location} onChange={(e) => setLocation(e.target.value)} required>
            <option value="">Select Location</option>
            <option value="clarence">179 Clarence St</option>
            <option value="murray">230 Murray St</option>
            <option value="nelson">221 Nelson St</option>
            <option value="eccles">55 Eccles St</option>
          </select>
        </div>
        <div>
        <label htmlFor="substanceType">Type of Substance (Mandatory): </label>
        <input
          type="text"
          id="substanceType"
          value={substanceType}
          onChange={(e) => setSubstanceType(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="routeOfAdministration">Route of Administration (Mandatory): </label>
        <input
          type="text"
          id="routeOfAdministration"
          value={routeOfAdministration}
          onChange={(e) => setRouteOfAdministration(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date (Mandatory): </label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} required />
      </div>
      <div>
        <label htmlFor="time">Time (Mandatory): </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="duration">Duration of Visit (Minutes): </label>
        <input
          type="range"
          id="duration"
          min="0"
          max="180"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        {duration} minutes
      </div>
      <div>
        <label htmlFor="medicalAssistance">Medical Assistance Needed (Y/N): </label>
        <input
          type="checkbox"
          id="medicalAssistance"
          checked={medicalAssistance}
          onChange={(e) => setMedicalAssistance(e.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="overdose">Overdose (Y/N): </label>
        <input
          type="checkbox"
          id="overdose"
          checked={overdose}
          onChange={(e) => setOverdose(e.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="allergicReactions">Allergic Reactions: </label>
        <input
          type="text"
          id="allergicReactions"
          value={allergicReactions}
          onChange={(e) => setAllergicReactions(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="generalComments">General Comments: </label>
        <textarea
          id="generalComments"
          value={generalComments}
          onChange={(e) => setGeneralComments(e.target.value)}
        />
      </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;

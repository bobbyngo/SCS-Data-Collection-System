import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/signin');
  };

  return (
    <div className="landing-container">
        <h1>Welcome to the SCS Web System</h1>
      <section className="section">
        <h2>Overview</h2>
        <p>The ‘Web Data System for Supervised Consumption Sites’ project aims to standardize data collection across Canada's supervised consumption sites. This initiative is pivotal in managing the data essential for Health Canada's policies and operational needs.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>Efficient, scalable, and secure cloud-based data management.</li>
          <li>Universal accessibility across devices for diverse data input.</li>
          <li>Options for anonymous data entry to ensure client confidentiality.</li>
          <li>Customizable dashboard for tailored reporting and automated data exports.</li>
        </ul>
      </section>

      <section className="section">
        <h2>FAQs</h2>
        <p>Common questions and answers about the system...</p>
      </section>

      <section className="section">
        <h2>Sites Info</h2>
        <p>Detailed information about the sites...</p>
      </section>

      <button className="button" onClick={handleLoginRedirect}>Go to Login</button>
    </div>
  );
};

export default LandingPage;

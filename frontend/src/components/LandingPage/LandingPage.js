import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/signin');
  };

  useEffect(() => {
    document.title = "SCS Web System"; // Sets the page title
}, []);

  return (
    <div className="landing-container">
        <h1>Welcome to the SCS Web System</h1>
        <p className="authors">by Huu Gia Bao Ngo, Mark Hamad, Stephnie Ughara</p>
        <p className="authors">under the guidance and supervision of Dr. James R. Green and Victoria Ajila</p>
        <section className="section">
            <h2>Overview</h2>
            <p>The ‘Web Data System for Supervised Consumption Sites’ project, developed in collaboration with Health Canada, aims to create a standardized data collection system for supervised consumption sites across Canada. This initiative serves the fundamental purpose of managing critical data for policymaking and operational needs within Health Canada.</p>
            <p>Designed as a cloud-based solution, the system provides universal accessibility, allowing for efficient and secure data management from various devices. It prioritizes client confidentiality with anonymous data entry options and offers a customizable dashboard to facilitate site-specific reporting requirements.</p>
            
            <h3>Project Significance</h3>
            <p>The project is pivotal in enhancing efficiency, security, and scalability in data management for supervised consumption sites, aligning with Health Canada's directives and national health standards.</p>
        </section>

        <section className="section">
            <h2>Background Information</h2>
            <p>Supervised Consumption Sites (SCS) offer safe and hygienic environments for individuals to consume pre-obtained drugs under trained supervision. These sites play a critical role in harm reduction strategies by preventing overdoses and the spread of diseases, offering medical aid, and connecting individuals to social and addiction treatment services.</p>
            
            <h3>Challenges and Solutions</h3>
            <p>The data management system addresses the challenges of data consistency and reporting by providing a unified platform for accurate data capture and management, ensuring transparency and accountability in SCS operations.</p>
        </section>

        <section className="section">
            <h2>System Features</h2>
            <p>The system includes role-based authentication, ensuring that different users have access to the necessary functionalities according to their roles. It features a user-friendly interface across devices, bilingual functionality, and integration with Power BI for advanced data analysis and visualization.</p>
            
            <h3>Data Privacy and Integrity</h3>
            <p>Data privacy is of utmost importance, and the system employs robust encryption and auditing measures to maintain data integrity and protect against unauthorized access.</p>
        </section>

        <button className="button" onClick={handleLoginRedirect}>Go to Login</button>
    </div>
  );
};

export default LandingPage;

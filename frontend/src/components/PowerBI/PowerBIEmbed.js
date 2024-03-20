import React, { useEffect} from 'react';
import '../styles/PowerBIEmbed.css';

const PowerBIEmbedComponent = () => {
  // Embed URL with the iframe approach
  const embedUrl = "https://app.powerbi.com/reportEmbed?reportId=7ba6336d-3285-44f3-bdd3-e1a823ee5cfe&autoAuth=true&ctid=6ad91895-de06-485e-bc51-fce126cc8530";

  useEffect(() => {
    document.title = "Power BI Dashboard"; // Sets the page title
}, []);

  return (
    <div className="powerbi-container">
      <h1>Power BI Dashboard</h1>
      <iframe
        title="Power BI Report"
        src={embedUrl}
        allowFullScreen="true"
        style={{ width: '100%', height: '600px' }} 
      ></iframe>
    </div>
  );
};

export default PowerBIEmbedComponent;

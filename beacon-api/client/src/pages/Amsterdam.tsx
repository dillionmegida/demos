import React from 'react';
import usePageAnalytics from '../hooks/usePageAnalytics';
import './CityPage.css';

const Amsterdam: React.FC = () => {
  // Track page view duration
  usePageAnalytics('/amsterdam'); 
  return (
    <div className="city-page">
      <h1>Amsterdam</h1>
      <div className="city-content">
        <div className="city-image amsterdam"></div>
        <div className="city-info">
          <h2>About Amsterdam</h2>
          <p>
            Amsterdam is the capital and most populous city of the Netherlands with a population of about 921,000 within the city proper, 1.4 million in the urban area, and 2.4 million in the metropolitan area.
          </p>
          <h3>Key Facts</h3>
          <ul>
            <li><strong>Population:</strong> 921,000 (city proper)</li>
            <li><strong>Area:</strong> 219.3 km²</li>
            <li><strong>Founded:</strong> 1300s</li>
            <li><strong>Famous for:</strong> Canals, museums, bicycles, and historic architecture</li>
          </ul>
          <h3>Must-See Attractions</h3>
          <ul>
            <li>Rijksmuseum - Dutch national museum with works by Rembrandt and Vermeer</li>
            <li>Van Gogh Museum - Largest collection of Van Gogh's paintings and drawings</li>
            <li>Anne Frank House - Where Anne Frank wrote her famous diary during WWII</li>
            <li>Vondelpark - The largest city park in Amsterdam</li>
            <li>Jordaan - Picturesque neighborhood with narrow streets and small shops</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Amsterdam;

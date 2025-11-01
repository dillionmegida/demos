import React from 'react';
import './CityPage.css';
import usePageAnalytics from '../hooks/usePageAnalytics';

const TheHague: React.FC = () => {
  usePageAnalytics('/the-hague');
  return (
    <div className="city-page">
      <h1>The Hague</h1>
      <div className="city-content">
        <div className="city-image the-hague"></div>
        <div className="city-info">
          <h2>About The Hague</h2>
          <p>
            The Hague is a city on the western coast of the Netherlands and the capital of the province of South Holland. It is the seat of the Dutch government and parliament, the Supreme Court, and the Council of State.
          </p>
          <h3>Key Facts</h3>
          <ul>
            <li><strong>Population:</strong> 553,000 (city proper)</li>
            <li><strong>Area:</strong> 98.1 km²</li>
            <li><strong>Founded:</strong> 13th century</li>
            <li><strong>Famous for:</strong> Being the seat of the Dutch government and international courts</li>
          </ul>
          <h3>Must-See Attractions</h3>
          <ul>
            <li>Binnenhof - The Dutch parliament complex with a beautiful courtyard</li>
            <li>Mauritshuis - Art museum housing Dutch Golden Age paintings</li>
            <li>Peace Palace - Home to the International Court of Justice</li>
            <li>Scheveningen Beach - Popular seaside resort with a long sandy beach</li>
            <li>Madurodam - Miniature park featuring Dutch landmarks at 1:25 scale</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TheHague;

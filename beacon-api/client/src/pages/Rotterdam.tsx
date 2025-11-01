import React from 'react';
import './CityPage.css';
import usePageAnalytics from '../hooks/usePageAnalytics';

const Rotterdam: React.FC = () => {
  usePageAnalytics('/rotterdam');
  return (
    <div className="city-page">
      <h1>Rotterdam</h1>
      <div className="city-content">
        <div className="city-image rotterdam"></div>
        <div className="city-info">
          <h2>About Rotterdam</h2>
          <p>
            Rotterdam is the second-largest city in the Netherlands and one of the most important ports in the world. Known for its modern architecture, the city was largely rebuilt after being bombed during World War II.
          </p>
          <h3>Key Facts</h3>
          <ul>
            <li><strong>Population:</strong> 651,000 (city proper)</li>
            <li><strong>Area:</strong> 319.4 km²</li>
            <li><strong>Founded:</strong> 1270</li>
            <li><strong>Famous for:</strong> Modern architecture, port, and cultural diversity</li>
          </ul>
          <h3>Must-See Attractions</h3>
          <ul>
            <li>Markthal - Iconic food market with a massive artwork on its ceiling</li>
            <li>Erasmusbrug - Stunning cable-stayed bridge nicknamed "The Swan"</li>
            <li>Euromast - 185m high observation tower with panoramic views</li>
            <li>Kinderdijk - Nearby UNESCO World Heritage site with 19 windmills</li>
            <li>Museum Boijmans Van Beuningen - Major art museum with works from the Middle Ages to the present</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rotterdam;

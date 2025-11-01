import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home: React.FC = () => {
  const [fact, setFact] = useState<string>('');
  const [city, setCity] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [factRes, cityRes] = await Promise.all([
          axios.get('/api/facts'),
          axios.get('/api/random-city')
        ]);
        setFact(factRes.data.fact);
        setCity(cityRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      <h1>Welcome to Dutch Cities Explorer</h1>
      <div className="content">
        <div className="card">
          <h2>Did you know?</h2>
          <p>{fact}</p>
        </div>
        
        {city && (
          <div className="card">
            <h2>Featured City: {city.name}</h2>
            <p><strong>Population:</strong> {city.population}</p>
            <p>{city.funFact}</p>
          </div>
        )}
        
        <div className="card">
          <h2>Explore Dutch Cities</h2>
          <p>Use the navigation above to explore information about three major cities in the Netherlands:</p>
          <ul>
            <li>Amsterdam - The capital city known for its artistic heritage and elaborate canal system</li>
            <li>Rotterdam - A major port city with modern architecture</li>
            <li>The Hague - The seat of the Dutch government and home to many international courts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

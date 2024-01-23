import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShowList.css';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
        const data = await response.json();

        const modifiedData = data.map(item => ({
          ...item,
          show: {
            ...item.show,
            language: item.show.language,
            runtime: item.show.runtime,
            days: item.show.schedule.days.join(', '),
            rating: item.show.rating.average,
            time: item.show.schedule.time,
          },
        }));

        setShows(modifiedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="show-list">
      <h1>QuadB Tech</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="show-cards-container">
          {shows.map((show) => (
            <div key={show.show.id} className="show-card">
              {show.show.image && (
                <img
                  src={show.show.image.medium}
                  alt={show.show.name}
                  className="show-image"
                />
              )}
              <div className="show-details">
                <h2><strong>{show.show.name}</strong></h2>
                <p>
                  <strong>Language:</strong> {show.show.language}
                </p>
                <div className="details-row">
                  <p>
                    <strong>Runtime:</strong> {show.show.runtime} minutes
                  </p>
                  <p>
                    <strong>Time:</strong> {show.show.time}
                  </p>
                </div>
                <div className="details-row">
                  <p>
                    <strong>Days:</strong> {show.show.days}
                  </p>
                  <p>
                    <strong>Rating:</strong> {show.show.rating}
                  </p>
                </div>
                <Link to={`/details/${show.show.id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowList;

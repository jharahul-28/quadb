// ShowDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ShowDetails.css'; // Import the CSS file for styling

const ShowDetails = () => {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    numberOfTickets: 1,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const data = await response.json();
        setShowDetails(data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchDetails();
  }, [showId]);

  const handleBookTicket = () => {
    setBookingFormVisible(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Save user details to local storage
    localStorage.setItem('userData', JSON.stringify(formData));

    // Add your logic to handle form data
    console.log('Form submitted:', formData);

    // Clear the form data
    setFormData({
      name: '',
      numberOfTickets: 1,
    });

    // Hide the booking form
    setBookingFormVisible(false);
  };

  return (
    <div className="show-details-container">
      {showDetails ? (
        <div className="show-details-content">
          <h1 className="show-details-header">{showDetails.name}</h1>
          <div className="show-detail-summary-image">
            <img
              src={showDetails.image.medium}
              alt={showDetails.name}
              className="show-details-image"
            />
            <p
              dangerouslySetInnerHTML={{ __html: showDetails.summary }}
              className="show-details-summary"
            />
          </div>
          {bookingFormVisible ? (
            <div className="booking-form">
              <h3>Booking Form</h3>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Movie Name:
                  <input type="text" value={showDetails.name} readOnly />
                </label>
                <label>
                  Number of Tickets:
                  <input
                    type="number"
                    name="numberOfTickets"
                    value={formData.numberOfTickets}
                    onChange={handleFormChange}
                    min="1"
                  />
                </label>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </label>
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : (
            <button onClick={handleBookTicket}>Book Ticket</button>
          )}

          <Link to="/">Go Back</Link>
        </div>
      ) : (
        <p>Loading details...</p>
      )}
    </div>
  );
};

export default ShowDetails;

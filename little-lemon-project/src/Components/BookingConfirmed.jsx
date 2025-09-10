import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getReservationById } from '../utils/localStorage';

const BookingConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    
    if (location.state?.reservation) {
      setReservation(location.state.reservation);
    } else if (location.state?.reservationId) {
   
      const savedReservation = getReservationById(location.state.reservationId);
      setReservation(savedReservation);
    } else {
  
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!reservation) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          <h4>No reservation found</h4>
          <p>Please make a new reservation.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/reservation')}
          >
            Make Reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-4">
                <h2 className="text-success">
                  🎉 Booking Confirmed!
                </h2>
                <p className="text-muted">
                  Your reservation has been successfully confirmed
                </p>
              </div>
              
              <div className="reservation-details">
                <h4>Reservation Details</h4>
                <div className="row">
                  <div className="col-sm-6">
                    <p><strong>Name:</strong> {reservation.name}</p>
                    <p><strong>Email:</strong> {reservation.email}</p>
                    {reservation.phone && (
                      <p><strong>Phone:</strong> {reservation.phone}</p>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <p><strong>Date:</strong> {reservation.date}</p>
                    <p><strong>Time:</strong> {reservation.time}</p>
                    <p><strong>Guests:</strong> {reservation.guests}</p>
                    {reservation.occasion && (
                      <p><strong>Occasion:</strong> {reservation.occasion}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-3">
                  <p><strong>Reservation ID:</strong> {reservation.id}</p>
                  <p><strong>Created:</strong> {new Date(reservation.createdAt).toLocaleString()}</p>
                  <p><strong>Status:</strong> 
                    <span className="badge bg-success ms-2">{reservation.status}</span>
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <button 
                  className="btn btn-primary me-3" 
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </button>
                <button 
                  className="btn btn-outline-primary" 
                  onClick={() => navigate('/my-reservations')}
                >
                  View All Reservations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmed;
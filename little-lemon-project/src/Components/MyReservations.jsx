import React, { useState, useEffect } from 'react';
import { getReservations, deleteReservation } from '../utils/localStorage';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = () => {
    try {
      const savedReservations = getReservations();
     
      const sortedReservations = savedReservations.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setReservations(sortedReservations);
    } catch (error) {
      console.error('Error loading reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      const success = deleteReservation(id);
      if (success) {
        loadReservations();
      } else {
        alert('Failed to delete reservation');
      }
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (reservations.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2>My Reservations</h2>
          <p>You don't have any reservations yet.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => window.location.href = '/reservation'}
          >
            Make a Reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>My Reservations</h2>
      
      <div className="row">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title">{reservation.name}</h5>
                  <span className={`badge ${
                    reservation.status === 'confirmed' ? 'bg-success' : 'bg-warning'
                  }`}>
                    {reservation.status}
                  </span>
                </div>
                
                <div className="row mt-3">
                  <div className="col-6">
                    <small className="text-muted">Date & Time</small>
                    <p className="mb-1">{reservation.date}</p>
                    <p className="mb-0">{reservation.time}</p>
                  </div>
                  <div className="col-6">
                    <small className="text-muted">Details</small>
                    <p className="mb-1">{reservation.guests} guests</p>
                    {reservation.occasion && (
                      <p className="mb-0">{reservation.occasion}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-3">
                  <small className="text-muted">Contact</small>
                  <p className="mb-1">{reservation.email}</p>
                  {reservation.phone && (
                    <p className="mb-0">{reservation.phone}</p>
                  )}
                </div>
                
                <div className="mt-3 pt-3 border-top">
                  <small className="text-muted">
                    Created: {new Date(reservation.createdAt).toLocaleDateString()}
                  </small>
                  <div className="mt-2">
                    <small className="text-muted me-3">ID: {reservation.id}</small>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(reservation.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReservations;
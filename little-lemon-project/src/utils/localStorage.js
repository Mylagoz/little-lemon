// Utility functions for managing reservations in localStorage

const RESERVATIONS_KEY = 'littleLemonReservations';

export const saveReservation = (reservationData) => {
  try {
    // Get existing reservations first
    const existingReservations = getReservationsInternal();
    
    // Create new reservation object
    const newReservation = {
      ...reservationData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    
    // Add to existing reservations
    const updatedReservations = [...existingReservations, newReservation];
    
    // Save to localStorage
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(updatedReservations));
    
    console.log('Reservation saved to localStorage:', newReservation);
    return newReservation;
  } catch (error) {
    console.error('Error saving reservation to localStorage:', error);
    return null;
  }
};

// Internal function that throws errors (used by other functions internally)
const getReservationsInternal = () => {
  const reservations = localStorage.getItem(RESERVATIONS_KEY);
  
  if (reservations === null || reservations === '') {
    return [];
  }
  
  const parsed = JSON.parse(reservations);
  return Array.isArray(parsed) ? parsed : [];
};

// Public function that handles errors gracefully
export const getReservations = () => {
  try {
    return getReservationsInternal();
  } catch (error) {
    console.error('Error getting reservations from localStorage:', error);
    return [];
  }
};

export const getReservationById = (id) => {
  try {
    const reservations = getReservationsInternal();
    return reservations.find(reservation => reservation.id === id) || null;
  } catch (error) {
    console.error('Error getting reservation by ID:', error);
    return null;
  }
};

export const updateReservation = (id, updatedData) => {
  try {
    const reservations = getReservationsInternal();
    const index = reservations.findIndex(reservation => reservation.id === id);
    
    if (index === -1) {
      return null;
    }
    
    reservations[index] = {
      ...reservations[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
    return reservations[index];
  } catch (error) {
    console.error('Error updating reservation:', error);
    return null;
  }
};

export const deleteReservation = (id) => {
  try {
    const reservations = getReservationsInternal();
    const filteredReservations = reservations.filter(reservation => reservation.id !== id);
    
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(filteredReservations));
    return true;
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return false;
  }
};

export const clearAllReservations = () => {
  try {
    localStorage.removeItem(RESERVATIONS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing reservations:', error);
    return false;
  }
};
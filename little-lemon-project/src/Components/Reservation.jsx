import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown.jsx';
import "../Styles/Reservation.css";
import { validateField, validateAll as coreValidateAll } from '../validation/reservationValidation.js';

function Reservation({ className, onChange, form, availableTimes, onSubmit }) {
  const specialOccasionOptions = ["birthday", "anniversary", "wedding"];
  const seatPreferenceOptions = ["indoor", "outdoor", "window"];
  const navigate = useNavigate();

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validate = validateField;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validate(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    onChange(field, value);
    if (touched[field]) {
      const error = validate(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const validateAll = () => {
    const newErrors = coreValidateAll(form);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLocalSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setIsSubmitting(true);
    setError('');
    const valid = validateAll();
    if (!valid) {
      setTouched((prev) => ({ ...prev, name: true, lastName: true, email: true, phone: true, date: true, guests: true, time: true, specialOccasion: true, seatPreference: true }));
      setShowSummary(true);
      setIsSubmitting(false);
      return;
    }
    const reservation = {
      ...form,
      guests: Number(form.guests),
      pricePerGuest: 25,
      subtotal: Number(form.guests || 0) * 25,
      taxRate: 0.1,
    };
    reservation.tax = +(reservation.subtotal * reservation.taxRate).toFixed(2);
    reservation.total = +(reservation.subtotal + reservation.tax).toFixed(2);
    try {
      const result = await onSubmit(reservation);
      if (result.success) {
        navigate('/reservation/payment');
      } else {
        setError(result.error || 'Failed to submit reservation');
      }
    } catch (error) {
      setError('An error occurred while submitting the reservation');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={className}>
      <h2>Reserve a Table</h2>
      <form onSubmit={handleLocalSubmit} className={`${className}-form`} noValidate aria-describedby={showSummary && Object.keys(errors).length ? 'reservation-errors' : undefined}>
        {showSummary && submitAttempted && Object.keys(errors).length > 0 && (
          <div id="reservation-errors" role="alert" className="error-summary" aria-live="assertive">
            <p><strong>Please fix the following {Object.keys(errors).length} field{Object.keys(errors).length>1?'s':''}:</strong></p>
            <ul>
              {Object.entries(errors).map(([field,msg]) => (
                <li key={field}><a href={`#${field}`}>{msg}</a></li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <label htmlFor="name" className="input-field">
            Name*
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              required
              minLength={2}
              maxLength={30}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name? 'error-name': undefined}
            />
            {touched.name && errors.name && <span id="error-name" className="error-message">{errors.name}</span>}
          </label>
          <label htmlFor="last-name" className="input-field">
            Last Name*
            <input
              type="text"
              id="last-name"
              placeholder="Enter last name"
              value={form.lastName}
              onChange={e => handleChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              required
              minLength={2}
              maxLength={30}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName? 'error-lastName': undefined}
            />
            {touched.lastName && errors.lastName && <span id="error-lastName" className="error-message">{errors.lastName}</span>}
          </label>
        </div>
        <div>
          <label htmlFor="email" className="input-field">
            Email*
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              required
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email? 'error-email': undefined}
            />
            {touched.email && errors.email && <span id="error-email" className="error-message">{errors.email}</span>}
          </label>
          <label htmlFor="phone" className="input-field">
            Phone*
            <input
              type="tel"
              id="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={e => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              required
              minLength={7}
              maxLength={20}
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone? 'error-phone': undefined}
            />
            {touched.phone && errors.phone && <span id="error-phone" className="error-message">{errors.phone}</span>}
          </label>
        </div>
        <div>
          <label htmlFor="date">
            Choose Date*
            <input
              type="date"
              id="date"
              value={form.date}
              onChange={e => handleChange('date', e.target.value)}
              onBlur={() => handleBlur('date')}
              required
              min={new Date().toISOString().split('T')[0]}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date? 'error-date': undefined}
            />
            {touched.date && errors.date && <span id="error-date" className="error-message">{errors.date}</span>}
          </label>
          <label htmlFor="guests">
            Guests*
            <input
              type="number"
              id="guests"
              placeholder="1"
              min="1"
              max="10"
              value={form.guests}
              onChange={e => handleChange('guests', e.target.value)}
              onBlur={() => handleBlur('guests')}
              required
              aria-invalid={!!errors.guests}
              aria-describedby={errors.guests? 'error-guests': undefined}
            />
            {touched.guests && errors.guests && <span id="error-guests" className="error-message">{errors.guests}</span>}
          </label>
        </div>
        <div>
          <label htmlFor="time">
            Choose Time*
            <Dropdown
              options={availableTimes}
              value={form.time}
              ariaLabel="Choose Time"
              field="time"
              onChange={handleChange}
              onBlur={() => handleBlur('time')}
            />
            {touched.time && errors.time && <span id="error-time" className="error-message">{errors.time}</span>}
          </label>
          <label htmlFor="special-occasion">
            Special Occasion*
            <Dropdown
              options={specialOccasionOptions}
              value={form.specialOccasion}
              ariaLabel="Special Occasion"
              field="specialOccasion"
              onChange={handleChange}
              onBlur={() => handleBlur('specialOccasion')}
            />
            {touched.specialOccasion && errors.specialOccasion && <span id="error-specialOccasion" className="error-message">{errors.specialOccasion}</span>}
          </label>
          <label htmlFor="seat-preference">
            Seat Preference*
            <Dropdown
              options={seatPreferenceOptions}
              value={form.seatPreference}
              ariaLabel="Seat Preference"
              field="seatPreference"
              onChange={handleChange}
              onBlur={() => handleBlur('seatPreference')}
            />
            {touched.seatPreference && errors.seatPreference && <span id="error-seatPreference" className="error-message">{errors.seatPreference}</span>}
          </label>
        </div>
        <label htmlFor="comments">
          Additional Comments
          <textarea
            id="comments"
            placeholder="Enter any additional comments"
            value={form.comments}
            onChange={e => handleChange('comments', e.target.value)}
            maxLength={200}
          ></textarea>
        </label>
         <button
           type="submit"
           className="button-ct"
           disabled={isSubmitting}
         >
          {isSubmitting ? 'Submitting...' : 'Continue'}
        </button>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </form>
    </section>
  );
}
export default Reservation;

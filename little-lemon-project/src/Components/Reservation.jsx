import Dropdown from './Dropdown.jsx'
import { useNavigate } from 'react-router-dom'
import "../Styles/Reservation.css";



function Reservation ({ className, onChange, form, availableTimes, onSubmit }) {
  const specialOccasionOptions = ["birthday", "anniversary", "wedding"];
  const seatPreferenceOptions = ["indoor", "outdoor", "window"];
  const navigate = useNavigate();

  
  const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$";
  const phonePattern = "^[0-9\\-\\+\\s\\(\\)]{7,}$";

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    
    const reservation = {
      ...form,
      guests: Number(form.guests),
      pricePerGuest: 25,
      subtotal: Number(form.guests || 0) * 25,
      taxRate: 0.1
    };
    reservation.tax = +(reservation.subtotal * reservation.taxRate).toFixed(2);
    reservation.total = +(reservation.subtotal + reservation.tax).toFixed(2);
    onSubmit(reservation);
    navigate('/reservation/payment');
  };


return (
    <section className={className}>

  <h2>Reserve a Table</h2>
         <form onSubmit={handleLocalSubmit} className={`${className}-form`} noValidate>
<div>
  <label htmlFor="name">
    Name*
   <input
     type="text"
     id="name"
     placeholder="Enter your name"
     value={form.name}
     onChange={e => onChange('name', e.target.value)}
     required
     minLength={2}
     maxLength={30}
   />
  </label>
  <label htmlFor="last-name">
    Last Name*
   <input
     type="text"
     id="last-name"
     placeholder="Enter your last name"
     value={form.lastName}
     onChange={e => onChange('lastName', e.target.value)}
     required
     minLength={2}
     maxLength={30}
   />
  </label>
  </div>
  <div>
  <label htmlFor="email">
    Email*
   <input
     type="email"
     id="email"
     placeholder="Enter your email"
     value={form.email}
     onChange={e => onChange('email', e.target.value)}
     required
     pattern={emailPattern}
     autoComplete="email"
   />
  </label>
  <label htmlFor="phone">
    Phone
   <input
     type="tel"
     id="phone"
     placeholder="Phone number"
     value={form.phone}
     onChange={e => onChange('phone', e.target.value)}
     required
     pattern={phonePattern}
     minLength={7}
     maxLength={20}
     autoComplete="tel"
   />
  </label>
  </div>
  <div>
  <label htmlFor="date">
    Choose Date*
   <input
     type="date"
     id="date"
     value={form.date}
     onChange={e => onChange('date', e.target.value)}
     required
     min={new Date().toISOString().split('T')[0]}
   />
  </label>
  <label htmlFor="guests">
    Number of Guests*
  <input
    type="number"
    id="guests"
    placeholder="1"
    min="1"
    max="10"
    value={form.guests}
    onChange={e => onChange('guests', e.target.value)}
    required
  />
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
    onChange={onChange}
  />
  </label>
  <label htmlFor="special-occasion">
    Special Occasion*
  <Dropdown
    options={specialOccasionOptions}
    value={form.specialOccasion}
    ariaLabel="Special Occasion"
    field="specialOccasion"
    onChange={onChange}
  />
  </label>
  <label htmlFor="seat-preference">
    Seat Preference*
  <Dropdown
    options={seatPreferenceOptions}
    value={form.seatPreference}
    ariaLabel="Seat Preference"
    field="seatPreference"
    onChange={onChange}
  />
  </label>
  </div>
  <label htmlFor="comments">
    Additional Comments
  <textarea
    id="comments"
    placeholder="Enter any additional comments"
    value={form.comments}
    onChange={e => onChange('comments', e.target.value)}
    maxLength={200}
  ></textarea>
  </label>
  <button
    type="submit"
    className="button-ct"
    disabled={
      !form.name.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone ||
      !form.date ||
      !form.guests ||
      !form.time
    }
  >
    Continue
  </button>
</form>

    </section>
)


}
export default Reservation;
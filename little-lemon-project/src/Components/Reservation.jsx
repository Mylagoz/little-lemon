import Dropdown from './Dropdown.jsx'
import {useNavigate} from 'react-router-dom'
import "../Styles/Reservation.css";




function Reservation ({className , onChange,form, availableTimes, onSubmit}) {
   const specialOccasionOptions = ["birthday","anniversary","wedding"]
   const seatPreferenceOptions = ["indoor","outdoor","window"]
    const navigate = useNavigate();

    const handleLocalSubmit =(e)=>{
        e.preventDefault();
        const reservation={
            ...form,
            guests:Number(form.guests),
            pricePerGuest: 25,
            subtotal: Number(form.guests || 0) * 25,
            taxRate: 0.1
        };
        reservation.tax = +(reservation.subtotal * reservation.taxRate).toFixed(2);
        reservation.total = +(reservation.subtotal + reservation.tax).toFixed(2);
        onSubmit(reservation);
        navigate('/reservation/payment');

    }


return (
    <section className={className}>

  <h2>Reserve a Table</h2>
         <form onSubmit={handleLocalSubmit} className={`${className}-form`}>
            <label htmlFor="name">Name</label><br />
  <input
    type="text"
    id="name"
    placeholder="Enter your name"
    value={form.name}
    onChange={e => onChange('name', e.target.value)}
  />
  <label htmlFor="last-name">Last Name</label><br />
  <input
    type="text"
    id="last-name"
    placeholder="Enter your last name"
    value={form.lastName}
    onChange={e => onChange('lastName', e.target.value)}
  />
  <label htmlFor="email">Email</label><br />
  <input
    type="email"
    id="email"
    placeholder="Enter your email"
    value={form.email}
    onChange={e => onChange('email', e.target.value)}
  />
  <label htmlFor="phone">Phone</label><br />
  <input
    type="tel"
    id="phone"
    placeholder="Enter your phone number"
    value={form.phone}
    onChange={e => onChange('phone', e.target.value)}
  />
  <label htmlFor="date">Choose Date</label><br />
  <input
    type="date"
    id="date"
    value={form.date}
    onChange={e => onChange('date', e.target.value)}
  />
  <label htmlFor="guests">Number of Guests</label><br />
  <input
    type="number"
    id="guests"
    placeholder="1"
    min="1"
    max="10"
    value={form.guests}
    onChange={e => onChange('guests', e.target.value)}
  />
  <label htmlFor="time">Choose Time</label><br />
  <Dropdown
    options={availableTimes}
    value={form.time}
    ariaLabel="Choose Time"
    field="time"
    onChange={onChange}
  />
  <label htmlFor="special-occasion">Special Occasion</label><br />
  <Dropdown
    options={specialOccasionOptions}
    value={form.specialOccasion}
    ariaLabel="Special Occasion"
    field="specialOccasion"
    onChange={onChange}
  />
  <label htmlFor="seat-preference">Seat Preference</label><br />
  <Dropdown
    options={seatPreferenceOptions}
    value={form.seatPreference}
    ariaLabel="Seat Preference"
    field="seatPreference"
    onChange={onChange}
  />
  <label htmlFor="comments">Additional Comments</label><br />
  <textarea
    id="comments"
    placeholder="Enter any additional comments"
    value={form.comments}
    onChange={e => onChange('comments', e.target.value)}
  ></textarea>
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
import { useNavigate} from 'react-router-dom';
import {useState, useRef} from 'react';
import '../Styles/Payment.css';

function Payment({ className, reservation, onSubmit }) {
  const navigate = useNavigate();
  const dialogRef = useRef(null);

  // Payment form state
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [error, setError] = useState('');

  if (!reservation) {
    return (
      <section className={className}>
        <p>No reservation in progress.</p>
        <button className="button-ct" onClick={() => navigate('/reservation')}>
          Back to form
        </button>
      </section>
    );
  }

  const {
    name, lastName, date, time, guests,
    pricePerGuest, subtotal, tax, total
  } = reservation;

  // Basic card validation
  const isCardValid =
    card.number.replace(/\s/g, '').length === 16 &&
    card.name.trim().length > 0 &&
    /^\d{2}\/\d{2}$/.test(card.expiry) &&
    /^\d{3,4}$/.test(card.cvc);

  const handlePay = (e) => {
    e.preventDefault();
    if (!isCardValid) {
      setError('Please fill all card fields correctly.');
      return;
    }
    setError('');
    
    dialogRef.current?.showModal();
  };

  const handleDialogClose = () => {
    dialogRef.current?.close();
    navigate('/');
    onSubmit({  name:'',
        lastName:'',
        email:'',
        phone:'',
        date:'',
        guests: '',
        time:'',
        specialOccasion:'',
        comments:'',
        seatPreference:''
});
  };

  return (
    <section className={className}>
      <h2>Reservation Review</h2>
      <ul>
        <li>Name: {name} {lastName}</li>
        <li>Date: {date}</li>
        <li>Time: {time}</li>
        <li>Guests: {guests}</li>
      </ul>
      <h3>Bill</h3>
      <ul>
        <li>Price per guest: ${pricePerGuest.toFixed(2)}</li>
        <li>Subtotal: ${subtotal.toFixed(2)}</li>
        <li>Tax: ${tax.toFixed(2)}</li>
        <li><strong>Total: ${total.toFixed(2)}</strong></li>
      </ul>
      <form className="payment-form" onSubmit={handlePay} style={{ marginTop: '2rem' }}>
        <h3>Pay by Card</h3>
        <label htmlFor="card-number">Card Number</label>
        <input
          id="card-number"
          type="text"
          inputMode="numeric"
          maxLength={19}
          placeholder="1234 5678 9012 3456"
          value={card.number}
          onChange={e => setCard({ ...card, number: e.target.value.replace(/[^\d ]/g, '') })}
          autoComplete="cc-number"
          required
        />
        <label htmlFor="card-name">Name on Card</label>
        <input
          id="card-name"
          type="text"
          placeholder="Cardholder Name"
          value={card.name}
          onChange={e => setCard({ ...card, name: e.target.value })}
          autoComplete="cc-name"
          required
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="card-expiry">Expiry (MM/YY)</label>
            <input
              id="card-expiry"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="MM/YY"
              value={card.expiry}
              onChange={e => setCard({ ...card, expiry: e.target.value.replace(/[^\d/]/g, '') })}
              autoComplete="cc-exp"
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="card-cvc">CVC</label>
            <input
              id="card-cvc"
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="CVC"
              value={card.cvc}
              onChange={e => setCard({ ...card, cvc: e.target.value.replace(/[^\d]/g, '') })}
              autoComplete="cc-csc"
              required
            />
          </div>
        </div>
        {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="button" className="button-ct" onClick={() => navigate('/reservation')}>Edit</button>
          <button type="submit" className="button-ct" disabled={!isCardValid}>Pay ${total.toFixed(2)}</button>
        </div>
      </form>

  
      <dialog ref={dialogRef} className="payment-dialog">
        <h3>Payment Successful!</h3>
        <p>Your reservation is confirmed.</p>
        <button className="button-ct" onClick={handleDialogClose}>Return Home</button>
      </dialog>
    </section>
  );
}

export default Payment;
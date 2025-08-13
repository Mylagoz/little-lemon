import { useNavigate } from 'react-router-dom';

function Payment({ className, reservation }) {
  const navigate = useNavigate();

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
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="button-ct" onClick={() => navigate('/reservation')}>Edit</button>
        <button className="button-ct" onClick={() => navigate('/')}>Confirm</button>
      </div>
    </section>
  );
}

export default Payment;
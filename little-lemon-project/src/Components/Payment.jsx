import { useNavigate} from 'react-router-dom';
import {useRef} from 'react';
import '../Styles/Payment.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

function Payment({ className, reservation, onSubmit }) {
  const navigate = useNavigate();
  const dialogRef = useRef(null);

  const PaymentSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .required('Card number is required')
      .test(
        'is-credit-card',
        'Must be a valid 16-digit card number',
        value => value?.replace(/\s/g, '').length === 16 && /^\d{16}$/.test(value.replace(/\s/g, ''))
      ),
    cardName: Yup.string()
      .required('Name on card is required')
      .min(2, 'Name must be at least 2 characters'),
    cardExpiry: Yup.string()
      .required('Expiry date is required')
      .matches(/^\d{2}\/\d{2}$/, 'Expiry date must be in MM/YY format'),
    cardCvc: Yup.string()
      .required('CVC is required')
      .matches(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
  });

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

  const saveReservationToLocalStorage = () => {
    try {
      const reservationToSave = {
        ...reservation,
        id: Date.now(),
        paymentDate: new Date().toISOString(),
      }
      const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
      const updatedReservations = [reservationToSave, ...existingReservations];
      const limitedReservations = updatedReservations.slice(0, 10);
      localStorage.setItem('reservations', JSON.stringify(limitedReservations));
      localStorage.setItem('currentReservation', JSON.stringify(reservationToSave));

      console.log('Reservation saved successfully!');
      return true;
    } catch(error) {
      console.error('Error saving reservation:', error);
      return false;
    }
  };

  const handleSubmit = (values, {setSubmitting, setStatus}) => {
    const saved = saveReservationToLocalStorage();
    if(!saved) {
      setStatus({error: 'Failed to save reservation. Please try again.'});
      setSubmitting(false);
      return;
    }

    dialogRef.current?.showModal();
    setSubmitting(false);
  };

  const handleDialogClose = () => {
    dialogRef.current?.close();
    navigate('/');
    onSubmit({  
      name: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
      guests: '',
      time: '',
      specialOccasion: '',
      comments: '',
      seatPreference: ''
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
      
      {/* Replace regular form with Formik */}
      <Formik
        initialValues={{
          cardNumber: '',
          cardName: '',
          cardExpiry: '',
          cardCvc: ''
        }}
        validationSchema={PaymentSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty, status, setFieldValue }) => (
          <Form className="payment-form" style={{ marginTop: '2rem' }}>
            <h3>Pay by Card</h3>
            
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <Field
                id="cardNumber"
                name="cardNumber"
                type="text"
                inputMode="numeric"
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                autoComplete="cc-number"
                aria-describedby="cc-hint"
                onChange={(e) => {
                  // Format card number with spaces
                  const value = e.target.value.replace(/[^\d]/g, '');
                  const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                  setFieldValue('cardNumber', formatted);
                }}
              />
              <p id="cc-hint" className="form-hint">Enter the 16-digit number without spaces</p>
              <ErrorMessage name="cardNumber" component="div" className="error-message" />
            </div>
            
            <div className="form-group">
              <label htmlFor="cardName">Name on Card</label>
              <Field
                id="cardName"
                name="cardName"
                type="text"
                placeholder="Cardholder Name"
                autoComplete="cc-name"
              />
              <ErrorMessage name="cardName" component="div" className="error-message" />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="cardExpiry">Expiry (MM/YY)</label>
                <Field
                  id="cardExpiry"
                  name="cardExpiry"
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                  onChange={(e) => {
                    // Format as MM/YY
                    let value = e.target.value.replace(/[^\d]/g, '');
                    if (value.length > 2) {
                      value = value.slice(0, 2) + '/' + value.slice(2);
                    }
                    setFieldValue('cardExpiry', value);
                  }}
                />
                <ErrorMessage name="cardExpiry" component="div" className="error-message" />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="cardCvc">CVC</label>
                <Field
                  id="cardCvc"
                  name="cardCvc"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="CVC"
                  autoComplete="cc-csc"
                  onChange={(e) => {
                    // Only allow digits
                    const value = e.target.value.replace(/[^\d]/g, '');
                    setFieldValue('cardCvc', value);
                  }}
                />
                <ErrorMessage name="cardCvc" component="div" className="error-message" />
              </div>
            </div>
            
            {status && status.error && (
              <div style={{ color: 'red', marginTop: '0.5rem' }}>{status.error}</div>
            )}
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button 
                type="button" 
                className="button-ct" 
                onClick={() => navigate('/reservation')}
              >
                Edit
              </button>
              <button 
                type="submit" 
                className="button-ct" 
                disabled={isSubmitting || !isValid || !dirty}
              >
                Pay ${total.toFixed(2)}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <dialog ref={dialogRef} className="payment-dialog">
        <h3>Payment Successful!</h3>
        <p>Your reservation is confirmed.</p>
        <p>A copy has been saved to your device.</p>
        <button className="button-ct" onClick={handleDialogClose}>Return Home</button>
      </dialog>
    </section>
  );
}

export default Payment;
import Dropdown from './Dropdown.jsx';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "../Styles/Reservation.css";

function Reservation({ className, onChange, form, availableTimes, onSubmit, timesLoading, timesError }) {
  const specialOccasionOptions = ["birthday", "anniversary", "wedding"];
  const seatPreferenceOptions = ["indoor", "outdoor", "window"];
  const navigate = useNavigate();

  const ReservationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(30, 'Name must not exceed 30 characters')
      .required('Name is required'),
    lastName: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .max(30, 'Last name must not exceed 30 characters')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]{7,20}$/, 'Invalid phone number')
      .required('Phone number is required'),
    date: Yup.date()
      .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Date cannot be in the past')
      .required('Date is required'),
    guests: Yup.number()
      .min(1, 'Must have at least 1 guest')
      .max(10, 'Cannot exceed 10 guests')
      .required('Number of guests is required'),
    time: Yup.string()
      .required('Time is required'),
    specialOccasion: Yup.string()
      .required('Special occasion is required'),
    seatPreference: Yup.string()
      .required('Seat preference is required'),
    comments: Yup.string()
      .max(200, 'Comments cannot exceed 200 characters')
  });

  const handleSubmit = (values) => {
    const reservation = {
      ...values,
      guests: Number(values.guests),
      pricePerGuest: 25,
      subtotal: Number(values.guests || 0) * 25,
      taxRate: 0.1,
    };
    reservation.tax = +(reservation.subtotal * reservation.taxRate).toFixed(2);
    reservation.total = +(reservation.subtotal + reservation.tax).toFixed(2);
    
    onSubmit(reservation);
    navigate('/reservation/payment');
  };

  const handleFieldChange = (field, value, setFieldValue) => {
    onChange(field, value);
    setFieldValue(field, value);
  };

  return (
    <section className={className} aria-labelledby="reservation-heading">
      <h2 id="reservation-heading">Reserve a Table</h2>
      
      {timesLoading && (
        <div className="loading-message" aria-live="polite">Loading available times...</div>
      )}
      
      {timesError && (
        <div className="error-banner" role="alert">
          Error loading available times. Please try again later.
        </div>
      )}
      
      <Formik
        initialValues={form}
        validationSchema={ReservationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, errors, touched, setFieldValue, handleBlur, isSubmitting, isValid }) => (
          <Form className={`${className}-form`} noValidate aria-label="Reservation form">
           
            {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
              <div className="visually-hidden" role="alert" aria-live="assertive">
                Please fix form errors before submitting
              </div>
            )}
            
            <div>
              <div className="form-group">
                <label htmlFor="name" className="input-field">
                  Name*
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    aria-required="true"
                    aria-label="First name"
                    onChange={(e) => handleFieldChange('name', e.target.value, setFieldValue)}
                    onBlur={handleBlur}
                    className={touched.name && errors.name ? 'error' : ''}
                    aria-invalid={!!(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? 'error-name' : undefined}
                  />
                </label>
                <ErrorMessage name="name" component="span" id="error-name" className="error-message" role="alert" />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName" className="input-field">
                  Last Name*
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter last name"
                    aria-required="true"
                    aria-label="Last name"
                    onChange={(e) => handleFieldChange('lastName', e.target.value, setFieldValue)}
                    onBlur={handleBlur}
                    className={touched.lastName && errors.lastName ? 'error' : ''}
                    aria-invalid={!!(touched.lastName && errors.lastName)}
                    aria-describedby={touched.lastName && errors.lastName ? 'error-lastName' : undefined}
                  />
                  <ErrorMessage name="lastName" component="span" id="error-lastName" className="error-message" role="alert" />
                </label>
              </div>
            </div>
          
            {/* Contact Information */}
            <div>
              <div className="form-group">
                <label htmlFor="email" className="input-field">
                  Email*
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    aria-required="true"
                    aria-label="Email address"
                    onChange={(e) => handleFieldChange('email', e.target.value, setFieldValue)}
                    onBlur={handleBlur}
                    className={touched.email && errors.email ? 'error' : ''}
                    aria-invalid={!!(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'error-email' : undefined}
                  />
                  <ErrorMessage name="email" component="span" id="error-email" className="error-message" role="alert" />
                </label>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="input-field">
                  Phone*
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    autoComplete="tel"
                    aria-required="true"
                    aria-label="Phone number"
                    onChange={(e) => handleFieldChange('phone', e.target.value, setFieldValue)}
                    onBlur={handleBlur}
                    className={touched.phone && errors.phone ? 'error' : ''}
                    aria-invalid={!!(touched.phone && errors.phone)}
                    aria-describedby={touched.phone && errors.phone ? 'error-phone' : undefined}
                  />
                  <ErrorMessage name="phone" component="span" id="error-phone" className="error-message" role="alert" />
                </label>
              </div>
            </div>
           
            <div>
              <div className="form-group">
                <label htmlFor="date">
                  Choose Date*
                  <Field
                    type="date"
                    id="date"
                    name="date"
                    aria-required="true"
                    aria-label="Reservation date"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleFieldChange('date', e.target.value, setFieldValue)}
                    onBlur={handleBlur}
                    className={touched.date && errors.date ? 'error' : ''}
                    aria-invalid={!!(touched.date && errors.date)}
                    aria-describedby={touched.date && errors.date ? 'error-date' : undefined}
                  />
                  <ErrorMessage name="date" component="span" id="error-date" className="error-message" role="alert" />
                </label>
              </div>
              
              <div className="form-group">
                <label htmlFor="guests">
                  Guests*
                  <Field
                    type="number"
                    id="guests"
                    name="guests"
                    placeholder="1"
                    min="1"
                    max="10"
                    aria-required="true"
                    aria-label="Number of guests"
                    aria-valuemin="1"
                    aria-valuemax="10"
                    onChange={(e) => handleFieldChange('guests', e.target.value, setFieldValue)}
                    onBlur={handleBlur}
                    className={touched.guests && errors.guests ? 'error' : ''}
                    aria-invalid={!!(touched.guests && errors.guests)}
                    aria-describedby={touched.guests && errors.guests ? 'error-guests' : undefined}
                  />
                  <ErrorMessage name="guests" component="span" id="error-guests" className="error-message" role="alert" />
                </label>
              </div>
            </div>
            
      
            <div>
              <div className="form-group">
                <label htmlFor="time">
                  Choose Time*
                
                  <Dropdown
                    options={availableTimes}
                    value={values.time}
                    ariaLabel="Choose reservation time"
                    ariaRequired="true"
                    ariaInvalid={!!(touched.time && errors.time)}
                    field="time"
                    onChange={(field, value) => handleFieldChange(field, value, setFieldValue)}
                    onBlur={() => handleBlur({ target: { name: 'time' } })}
                  />
                  <ErrorMessage name="time" component="span" id="error-time" className="error-message" role="alert" />
                </label>
              </div>
              
              <div className="form-group">
                <label htmlFor="specialOccasion">
                  Special Occasion*
                  <Dropdown
                    options={specialOccasionOptions}
                    value={values.specialOccasion}
                    ariaLabel="Select special occasion"
                    ariaRequired="true"
                    ariaInvalid={!!(touched.specialOccasion && errors.specialOccasion)}
                    field="specialOccasion"
                    onChange={(field, value) => handleFieldChange(field, value, setFieldValue)}
                    onBlur={() => handleBlur({ target: { name: 'specialOccasion' } })}
                  />
                  <ErrorMessage name="specialOccasion" component="span" id="error-specialOccasion" className="error-message" role="alert" />
                </label>
              </div>
              
              <div className="form-group">
                <label htmlFor="seatPreference">
                  Seat Preference*
                  <Dropdown
                    options={seatPreferenceOptions}
                    value={values.seatPreference}
                    ariaLabel="Select seating preference"
                    ariaRequired="true"
                    ariaInvalid={!!(touched.seatPreference && errors.seatPreference)}
                    field="seatPreference"
                    onChange={(field, value) => handleFieldChange(field, value, setFieldValue)}
                    onBlur={() => handleBlur({ target: { name: 'seatPreference' } })}
                  />
                  <ErrorMessage name="seatPreference" component="span" id="error-seatPreference" className="error-message" role="alert" />
                </label>
              </div>
            </div>
            
           
            <div className="form-group">
              <label htmlFor="comments">
                Additional Comments
                <Field
                  as="textarea"
                  id="comments"
                  name="comments"
                  placeholder="Enter any additional comments"
                  maxLength={200}
                  aria-label="Additional comments or requests"
                  onChange={(e) => handleFieldChange('comments', e.target.value, setFieldValue)}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="comments" component="span" id="error-comments" className="error-message" role="alert" />
              </label>
            </div>

            <button
              type="submit"
              className="button-ct"
              disabled={isSubmitting || (!isValid && Object.keys(touched).length > 0)}
              aria-label={isSubmitting ? "Processing reservation submission" : "Continue to payment"}
              aria-busy={isSubmitting}
              aria-disabled={isSubmitting || (!isValid && Object.keys(touched).length > 0)}
            >
              {isSubmitting ? 'Processing...' : 'Continue'}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default Reservation;

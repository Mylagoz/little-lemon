import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../Styles/RateUs.css';

function RateUs({ onAddReview }) {
  const navigate = useNavigate();

  // Define validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters.')
      .required('Name is required'),
    review: Yup.string()
      .min(10, 'Review must be at least 10 characters.')
      .max(300, 'Review must be 300 characters or less.')
      .required('Review is required'),
    rating: Yup.number()
      .min(1, 'Please provide a rating')
      .max(5, 'Maximum rating is 5')
      .required('Rating is required')
  });

  // Initial form values
  const initialValues = {
    name: '',
    review: '',
    rating: 5
  };

  const handleSubmit = (values, { resetForm }) => {
    const newReview = {
      name: values.name.trim(),
      review: values.review.trim(),
      rating: values.rating,
      image: `https://unavatar.io/${values.name.replace(/\s+/g, '')}`
    };
    
    onAddReview(newReview);
    resetForm();
    navigate('/');
  };

  return (
    <section className="rate-us">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, isValid }) => (
          <Form noValidate>
            <h2>Rate Our Service</h2>
            
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                aria-invalid={touched.name && !!errors.name}
                aria-describedby={touched.name && errors.name ? 'error-name' : undefined}
              />
              <ErrorMessage name="name" component="span" className="error-message" id="error-name" />
            </div>
            
            <div className="form-group">
              <label htmlFor="review">Your Review:</label>
              <Field
                as="textarea"
                id="review"
                name="review"
                placeholder="Share your experience (10-300 chars)"
                aria-invalid={touched.review && !!errors.review}
                aria-describedby={touched.review && errors.review ? 'error-review' : undefined}
              />
              <div className="char-count" aria-live="polite">{values.review.trim().length}/300</div>
              <ErrorMessage name="review" component="span" className="error-message" id="error-review" />
            </div>
            
            <fieldset>
              <legend>Rate your experience:</legend>
              <Field
                type="range"
                id="rating"
                name="rating"
                min="1"
                max="5"
                step="1"
                aria-label="Rating (1-5 stars)"
              />
              <div className="star-rating-display">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < values.rating ? "star filled" : "star"}>★</span>
                ))}
              </div>
              <ErrorMessage name="rating" component="span" className="error-message" />
            </fieldset>
            
            <button 
              type="submit" 
              className="button-ct" 
              disabled={!isValid}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default RateUs;
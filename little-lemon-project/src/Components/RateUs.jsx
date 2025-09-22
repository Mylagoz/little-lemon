import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/RateUs.css';


function RateUs({ onAddReview }) {
  const [form, setForm] = useState({ name: '', review: '' });
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const isValid = useMemo(() => {
    const nameOk = form.name.trim().length >= 2;
    const reviewLen = form.review.trim().length;
    const reviewOk = reviewLen >= 10 && reviewLen <= 300;
    return nameOk && reviewOk;
  }, [form.name, form.review]);

  const errors = {
    name: touched.name && (form.name.trim().length < 2 ? 'Name must be at least 2 characters.' : ''),
    review: touched.review && (form.review.trim().length < 10 ? 'Review must be at least 10 characters.' : form.review.trim().length > 300 ? 'Review must be 300 characters or less.' : '')
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, review: true });
    if (!isValid) return;
    const newReview = {
      name: form.name.trim(),
      review: form.review.trim(),
      image: `https://unavatar.io/${form.name.replace(/\s+/g, '')}`
    };
    onAddReview(newReview);
    setForm({ name: '', review: '' });
    setTouched({});
    navigate('/');
  };

  return (
    <section className="rate-us">
      <form onSubmit={handleSubmit} noValidate>
        <h2>Rate Our Service</h2>
        <label htmlFor="name">
          Your Name:
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onBlur={() => setTouched(t => ({ ...t, name: true }))}
            required
            minLength={2}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'error-name' : undefined}
            placeholder="Enter your name"
          />
          {errors.name && <span id="error-name" className="error-message">{errors.name}</span>}
        </label>
        <label htmlFor="review">
          Your Review:
          <textarea
            id="review"
            value={form.review}
            onChange={(e) => setForm({ ...form, review: e.target.value })}
            onBlur={() => setTouched(t => ({ ...t, review: true }))}
            required
            minLength={10}
            maxLength={300}
            aria-invalid={!!errors.review}
            aria-describedby={errors.review ? 'error-review' : undefined}
            placeholder="Share your experience (10-300 chars)"
          />
          <div className="char-count" aria-live="polite">{form.review.trim().length}/300</div>
          {errors.review && <span id="error-review" className="error-message">{errors.review}</span>}
        </label>
        {/* For star ratings */}
        <fieldset>
          <legend>Rate your experience:</legend>
          <input 
            type="radio" 
            id="star5" 
            name="rating" 
            value="5" 
            aria-label="5 stars"
          />
          <label htmlFor="star5" className="star-label">★</label>
          {/* other stars... */}
        </fieldset>
        <button type="submit" className="button-ct" disabled={!isValid}>Submit</button>
      </form>
    </section>
  );
}

export default RateUs;
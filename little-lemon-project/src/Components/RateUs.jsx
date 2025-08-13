import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/RateUs.css';


function RateUs({ onAddReview }) {
  const [form, setForm] = useState({ name: '', review: '' });
  const navigate = useNavigate();
   const isValid = useMemo (()=>{
    form.name.trim().length > 0 && form.review.trim().length > 0 && form.review.trim().length <= 300;
   }, [form.name, form.review]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const newReview = {
        name: form.name,
        review: form.review,
        image: `https://unavatar.io/${form.name.replace(/\s+/g, '')}`
      };
      onAddReview(newReview);
      navigate('/');
    }
    setForm({ name: '', review: '' });
  };

  return (
    <section className="rate-us">
     <form  disabled={!isValid} onSubmit={handleSubmit}>
         <h2>Rate Our Service</h2>
        <label htmlFor="name">  
            Your Name:
        </label>
          <input type="text" id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        
        <label htmlFor="review">
          Your Review:
        </label>
          <textarea id="review" value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} required minLength={10} maxLength={300} />

        <button type="submit" className="button-ct">Submit</button>
      </form>
    </section>
  );
}

export default RateUs;
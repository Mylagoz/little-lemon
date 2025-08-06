import Food from '../assets/restauranfood.jpg';
import Button from './Button.jsx';
import Specials from './Specials.jsx';
import About from './About.jsx';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


function Main({ className }) {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToAbout) {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
      
      window.history.replaceState({}, document.title);
    }
  }, [location]);
   
    return (
        <main className={className}>
          <section className="hero">
            <div className="hero-text">
              <h1>Little Lemon</h1>
              <h2>Chicago</h2>
              <p>Fresh Mediterranean flavors served with warmth and flair.
                 A cozy atmosphere and creative cocktails make it a local favorite.
                  Little Lemon adds a vibrant twist to classic dishes.</p>
              <Button className="btn" path="/reservation">Reserve a Table</Button>
            </div>
            <img src={Food} alt="Restaurant food" />
          </section>
          <Specials />
          <section className="ratings">
            <h2>Rate Us</h2>
            <div className="ratings-cards">
              {/* Repeat for each rating */}
              <div className="rating-card">Rating</div>
              {/* ... */}
            </div>
          </section>
          <About className="about" id="about" />
        </main>
    );
    
}


export default Main;
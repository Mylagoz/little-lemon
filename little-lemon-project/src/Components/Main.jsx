import Food from '../assets/restauranfood.webp';
import Button from './Button.jsx';
import Specials from './Specials.jsx';
import About from './About.jsx';
import Rating from './Rating.jsx';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Bruchetta from '../assets/bruchetta.webp';
import GreekSalad from '../assets/greek-salad.webp';
import LemonDessert from '../assets/lemon-dessert.jpg';
import '../Styles/Main.css';

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

    const specials =[
        {
            title: "BRUCHETTA",
            description: "Toasted rustic bread rubbed with garlic and drizzled with olive oil. Topped with ripe tomatoes, fresh basil, and a splash of balsamic vinegar. A simple, bold Italian appetizer bursting with flavor.",
            price: 10.99,
            img:{ src:Bruchetta, alt: "Bruchetta" }
        },
        {
            title: "GREEK SALAD",
            description: "Crisp cucumbers, ripe tomatoes, and Kalamata olives mingle with creamy feta for a burst of fresh flavor. Tossed in a zesty house-made vinaigrette with oregano and olive oil.",
            price: 12.99,
            img:{ src:GreekSalad, alt: "Greek Salad" }
        },
        {
            title: "LEMON DESSERT",
            description: "Light and fluffy layers infused with fresh lemon zest and juice. Frosted with tangy lemon cream cheese icing for a perfect sweet-tart balance. A bright, citrusy finish that melts in your mouth with every bite.",
            price: 9.99,
            img:{ src:LemonDessert, alt: "Lemon Dessert" }
        }
    ]

   
    return (
        <main className={className}>
          <section className="hero">
            <div className="hero-text">
              <h1>Little Lemon</h1>
              <h2>Chicago</h2>
              <p>Fresh Mediterranean flavors served with warmth and flair.
                 A cozy atmosphere and creative cocktails make it a local favorite.
                  Little Lemon adds a vibrant twist to classic dishes.</p>
              <Button className="button-ct" path="/reservation">Reserve a Table</Button>
            </div>
            <img src={Food} alt="Restaurant food" />
          </section>
          <Specials className="specials" dishes={specials} />
           <Rating className="ratings" />
          <About className="about" id="about" />
        </main>
    );
    
}


export default Main;
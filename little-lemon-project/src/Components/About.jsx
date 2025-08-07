import {Carousel} from 'react-bootstrap';
import { useState } from 'react';
import MarioAdrianA from '../assets/Mario and Adrian A.webp';
import Restaurant from '../assets/restaurant.jpg';
import MarioAdrianB from '../assets/Mario and Adrian b.webp';
import Adrian from '../assets/Adrian.webp';
import '../Styles/About.css';



function About ({ className }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleSelect = (selectedIndex)  => {
        setCurrentSlide(selectedIndex);
    };

    const slides = [
        { src: MarioAdrianA, alt: "Mario and Adrian A" },
        { src: Restaurant, alt: "Restaurant Interior" },
        { src: MarioAdrianB, alt: "Mario and Adrian B" },
        { src: Adrian, alt: "Adrian" }
    ];

    return (
    <section className={className} id="about">
     <article className="about-content">
        <h2>About Us</h2>
        <p>Welcome to Little Lemon, your favorite restaurant for delicious meals and unforgettable experiences.
           We are located in the heart of Chicago, serving a variety of Mediterranean dishes that are sure to tantalize your taste buds.
           Our team is dedicated to providing you with the best service and a warm, inviting atmosphere.
        </p>
     </article>
    <div className="about-carousel">
       <Carousel  activeIndex={currentSlide} interval={3000} onSelect={handleSelect}>
           {slides.map((slide) => (
               <Carousel.Item key={slide.src} className="about-carousel-item">
                   <div className="about-carousel-ratio">
                       <img src={slide.src} alt={slide.alt}  loading="lazy"/>
                   </div>
               </Carousel.Item>
           ))}
       </Carousel>
    </div>
     
    </section>
  );
}

export default About;
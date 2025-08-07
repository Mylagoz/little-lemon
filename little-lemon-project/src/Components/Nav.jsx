import {Link ,useNavigate} from 'react-router-dom';  
import { useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import HamburguerOpen from '../assets/menu-open.png';
import HamburguerClose from '../assets/menu-close.png';
import Basket from '../assets/Basket.svg';
import '../Styles/Nav.css';

function Nav({ className }) {
  const width = useWindowSize();
  const isMobile = width <= 768;
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMobileNav =()=> setOpenMenu((open)=>!open)

  const scrollToHome = () => {
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  const goToAboutSection = () => {
    if (window.location.pathname === '/') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollToAbout: true } });
    }
  }
  const navLinks = (
    <> 
          <ul>
            <li><Link to="/" onClick={scrollToHome}>Home</Link></li>
            <li><a href="#about" onClick={e => {e.preventDefault(); goToAboutSection();}}>About</a></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservation">Reservation</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        <Link to="/order"><img src={Basket} alt="Order Basket" /></Link>
    </>
  );


  return (
    <nav className={className}>
      {isMobile ? (
        <>
          <button onClick={toggleMobileNav}
            className={`mobile-nav-toggle${openMenu ? ' open' : ''}`}
            aria-expanded={openMenu}
            aria-label={openMenu ? "Close navigation" : "Open navigation"}
          >
          <img src={openMenu ? HamburguerOpen : HamburguerClose} alt="Hamburguer Icon" />
        </button>
        <ul className={`mobile-nav-links${openMenu ? '' : ' hidden'}`}
          aria-hidden={!openMenu}>
          {navLinks}
        </ul>
        </>
      ) : (
        <ul className="desktop-nav-links">
          {navLinks}
        </ul>
      )}
      </nav>
  );
}

export default Nav;
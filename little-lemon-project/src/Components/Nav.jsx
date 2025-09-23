import {Link ,useNavigate} from 'react-router-dom';  
import { useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import HamburguerOpen from '../assets/menu-open.png';
import HamburguerClose from '../assets/menu-close.png';
import '../Styles/Nav.css';

function Nav({ className }) {
  const width = useWindowSize();
  const isMobile = width <= 768;
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMobileNav = () => setOpenMenu((open) => !open);
  
  const closeMenu = () => {
    if (isMobile) {
      setOpenMenu(false);
    }
  };

  const scrollToHome = () => {
    closeMenu();
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  const goToAboutSection = () => {
    closeMenu();
    if (window.location.pathname === '/') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollToAbout: true } });
    }
  }
  
  const navLinks = (
    <>
      <li><Link to="/" onClick={scrollToHome} aria-current={window.location.pathname === '/' ? 'page' : undefined}>Home</Link></li>
      <li><a href="#about" onClick={e => {e.preventDefault(); goToAboutSection();}} aria-current={window.location.pathname === '/' ? 'page' : undefined}>About</a></li>
      <li><Link to="/menu" onClick={closeMenu} aria-current={window.location.pathname === '/menu' ? 'page' : undefined}>Menu</Link></li>
      <li><Link to="/reservation" onClick={closeMenu} aria-current={window.location.pathname === '/reservation' ? 'page' : undefined}>Reservation</Link></li>
    </>
  );

  return (
    <nav className={className} aria-label='Main Navigation'>
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
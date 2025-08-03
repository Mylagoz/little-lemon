import {useState} from 'react';
import HamburguerOpen from '../assets/menu-open.png';
import HamburguerClose from '../assets/menu-close.png';

function NavMobile({ className }) {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMobileNav = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className={className}>
      <button onClick={toggleMobileNav} className={`mobile-nav-toggle`} >
        {openMenu ? <img src={HamburguerOpen} alt="Close Menu Icon" /> : <img src={HamburguerClose} alt="Menu Icon" />}
      </button>
      {openMenu && (
        <ul className="mobile-nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#reservation">Reservation</a></li>
          <li><a href="#order-online">Order Online</a></li>
          <li><a href="#login">Login</a></li>
        </ul>
      )}
    </nav>
  );
}

export default NavMobile;
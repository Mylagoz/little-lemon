import Nav from './Nav'
import Logo from '../assets/Logo.svg'
import NavMobile from './NavMobile'
import useWindowSize from '../hooks/useWindowSize'

function Header({ className }) {
  const width = useWindowSize();
  const isMobile = width <= 768;

  return (
    <header className={className}>
      <img src={Logo} alt="Little Lemon Logo" />
      {isMobile ? (
        <NavMobile className="NavMobile" />
      ) : (
        <Nav className="Nav" />
      )}
    </header>
  );
}

export default Header;
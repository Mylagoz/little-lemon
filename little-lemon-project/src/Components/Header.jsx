import Nav from './Nav'
import Logo from '../assets/Logo.svg'
import '../Styles/Header.css';


function Header({ className }) {
 
  return (
    <header className={className}>
      <img src={Logo} alt="Little Lemon Logo" />
       <Nav className="Nav" />
    </header>
  );
}

export default Header;
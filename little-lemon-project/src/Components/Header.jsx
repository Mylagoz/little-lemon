import Nav from './Nav'
import Logo from '../assets/Logo.svg'
import '../Styles/Header.css';
import Basket from '../assets/Basket.svg';
import { Link } from 'react-router-dom';


function Header({ className }) {
 
  return (
    <header className={className}>
      <div>
      <img src={Logo} alt="Little Lemon Logo" />
       <Nav className="Nav" />
       </div>
       <Link to="/order" ><img src={Basket} alt="Order Basket" className="order-basket" /></Link>
    </header>
  );
}

export default Header;
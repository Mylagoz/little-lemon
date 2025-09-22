import FooterLogo from '../assets/1.png';
import '../Styles/Footer.css';


function Footer({ className }) {
  return (
    <footer className={className}>
      <div className="footer-info">
      <div className="footer-col">
        <div className="footer-img">
          <img src={FooterLogo} alt="Little Lemon Logo2"  />
        </div>
      </div>
      <div className="footer-col">
       
        <h5>Doormat</h5>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#reservation">Reservation</a></li>
          <li><a href="#order-online">Order Online</a></li>
          <li><a href="#login">Login</a></li>
        </ul>
        
      </div>
      <div className="footer-col">
        <h5>Social Media</h5>
        <ul>
          <li><a href="#facebook">Facebook</a></li>
          <li><a href="#instagram">Instagram</a></li>
          <li><a href="#linkedin">LinkedIn</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Contact</h5>
        <ul>
          <li><a 
               href="https://www.google.com/maps/place/?=1234 N Lemon Ave , Chicago, IL 60614 "
                target="_blank" 
                rel="noopener noreferrer"
                >
                1234 N Lemon Ave, Chicago, IL 60614
                </a></li>
          <li><a href="tel:+13125551234">(312) 555-1234</a></li>
          <li><a href="mailto:info@littlelemon.com">info@littlelemon.com</a></li>
        </ul>
      </div>
      </div>
      <p className="Copyright">© 2025 Little Lemon. All rights reserved.</p>
      {/* Footer navigation */}
      <nav aria-label="Footer navigation">
        <h2 className="visually-hidden">Footer links</h2>
        {/* links... */}
      </nav>
    </footer>
  )
}

export default Footer
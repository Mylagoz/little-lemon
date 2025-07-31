function Footer({ className }) {
  return (
    <footer className={className}>
      <div className="footer-col">
        {/* Placeholder for image */}
        <div className="footer-img"></div>
      </div>
      <div className="footer-col">
        <h5>Doormat</h5>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Menu</li>
          <li>Reservation</li>
          <li>Order Online</li>
          <li>Login</li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Social Media</h5>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>LinkedIn</li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Contact</h5>
        <ul>
          <li>Address</li>
          <li>Phone</li>
          <li>Email</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
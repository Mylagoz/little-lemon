function Nav({ className }) {
  return (
    <nav className={className}>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#reservation">Reservation</a></li>
        <li><a href="#order_online">Order Online</a></li>
        <li><a href="#login">Login</a></li>
      </ul>
    </nav>
  )
}

export default Nav
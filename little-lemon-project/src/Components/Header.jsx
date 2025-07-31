import Nav from './Nav'
import Logo from '../assets/Logo.svg'

function Header({ className }) {
  return (
    <header className={className}>
      <img src={Logo} alt="Little Lemon Logo" />
      <div className="HeaderTitle">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>Fresh Mediterranean flavors served with warmth and flair.</p>
        
      </div>
      <Nav className="Nav" />
    </header>
  )
}

export default Header
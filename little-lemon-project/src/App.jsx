import {Routes , Route} from 'react-router-dom'
{/*import Reservation from './Components/Reservation'*/}
import Menu from './Components/Menu'
import About from './Components/About'
{/*import OrderOnline from './Components/OrderOnline'
import Login from './Components/Login'*/}
import Specials from './Components/Specials'
import Header from './Components/Header'
import Main from './Components/Main'
import Footer from './Components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
        <Header className="Header" />
        <Routes>
          <Route path="/" element={<Main className="Main" />} />
          {/*<Route path="/reservation" element={<Reservation className="Reservation" />} />*/}
          <Route path="/menu" element={<Menu className="Menu" />} />
          <Route path="/about" element={<About className="about" id="about" />} />
         {/* <Route path="/order-online" element={<OrderOnline className="OrderOnline" />} />
          <Route path="/login" element={<Login className="Login" />} />*/}
          <Route path="/specials" element={<Specials className="specials" />} />
        </Routes>
        
        <Footer className="Footer" />
    </div>
  )
}

export default App

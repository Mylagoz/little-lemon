import Header from './Components/Header'
import Main from './Components/Main'
import Footer from './Components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="Container">
        <Header className="Header" />
        <Main className="Main" />
        <Footer className="Footer" />
      </div>
    </div>
  )
}

export default App

import {Routes , Route} from 'react-router-dom'
import Reservation from './Components/Reservation';
import { useState , useReducer} from 'react';
import RateUs from './Components/RateUs'
import Menu from './Components/Menu'
import About from './Components/About'
import Payment from './Components/Payment';
import Specials from './Components/Specials'
import Header from './Components/Header'
import Main from './Components/Main'
import Footer from './Components/Footer'
import './App.css'

const initialTimes =["17:00", "18:00", "19:00", "20:00", "21:00","22:00"]
const updateTimes =(state, action)=>{
    if(action.type ==='setByDate'){
        const d = action.date;
        if (!(d instanceof Date) || isNaN(d)) {
            return state;
        }if (d.getDay() === 0 || d.getDay() === 6) {
            return initialTimes.filter(t=> parseInt(t,10) < 19);
        }
        return initialTimes;
    }
    return state;
}

function App() {
        
 const [form, setForm] = useState ({
        name:'',
        lastName:'',
        email:'',
        phone:'',
        date:'',
        guests: '',
        time:'',
        specialOccasion:'',
        comments:'',
        seatPreference:''

    })

const [availableTimes, dispatch] = useReducer(updateTimes, initialTimes);


const handleFormChange = (field,value)=>{
    setForm(f => ({...f, [field]: value}));
    if (field === 'date'){
        const dateObj = new Date(value);
        dispatch({ type: 'setByDate', date: dateObj });
     setForm(f =>({...f, time:availableTimes.includes(f.time)? f.time:''}));   
    }
};
const [currentReservation , setCurrentReservation] = useState(null);


const handleReservationSubmit = (reservationData)=>{
    setCurrentReservation(reservationData);
  
}

   const [reviews, setReviews] = useState([
    { 
        name: 'John Doe',
        review: 'The food was amazing! I loved the Greek salad and the lemon dessert.',
        image: 'https://unavatar.io/JohnDoe'
    },
    {
        name: 'Jane Smith',
        review: 'Great atmosphere and friendly staff. Will definitely come back!',
        image: 'https://unavatar.io/JaneSmith'
    },
    {
        name: 'Alice Johnson',
        review: 'A delightful dining experience. The specials were top-notch!',
        image: 'https://unavatar.io/AliceJohnson'
    },
    {
        name: 'Bob Brown',
        review: 'Loved the ambiance and the food. The cocktails were a nice touch!',
        image: 'https://unavatar.io/Bobrown'
    },
    {
        name: 'Charlie White',
        review: 'A hidden gem! The Mediterranean flavors were spot on.',
        image: 'https://unavatar.io/CharlieWhite'
    },
    {
        name: 'Diana Green',
        review: 'Exceptional service and delicious food. Highly recommend the pasta dishes!',
        image: 'https://unavatar.io/DianaGreen'
    },
]);

const handleAddReview =(newReview) =>{
     setReviews(prevReviews =>{
      const updatedReviews = [newReview, ...prevReviews]
      if (updatedReviews.length >= 11){
           updatedReviews.pop()
      }
      return updatedReviews
     })
     
}


  return (
    <div className="App">
        <Header className="Header" />
        <Routes>
          <Route path="/" element={<Main className="Main" reviews={reviews} />} />
          <Route path="/rate-us" element={<RateUs className="RateUs" onAddReview={handleAddReview} />} />
          <Route 
            path="/reservation" 
            element={
            <Reservation 
            className="Reservation" 
            onChange={handleFormChange} 
            form={form}
            availableTimes={availableTimes}
            onSubmit={handleReservationSubmit}
           />} />
           <Route path="/reservation/payment" element={<Payment className="Payment" reservation={currentReservation} />} />
          <Route path="/menu" element={<Menu className="Menu" />} />
          <Route path="/about" element={<About className="about" id="about" />} />
          <Route path="/specials" element={<Specials className="specials" />} />
        </Routes>
        
        <Footer className="Footer" />
    </div>
  )
}

export default App

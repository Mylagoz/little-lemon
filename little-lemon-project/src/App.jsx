import {Routes , Route, useNavigate } from 'react-router-dom'
import Reservation from './Components/Reservation';
import { useState , useReducer, useEffect} from 'react';
import RateUs from './Components/RateUs'
import Menu from './Components/Menu'
import About from './Components/About'
import Payment from './Components/Payment';
import Specials from './Components/Specials'
import Header from './Components/Header'
import Main from './Components/Main'
import Footer from './Components/Footer'
import './App.css'
import { saveReservation } from './utils/localStorage';

const initialTimes = async (date) => {
  try {
    const response = await fetch("https://raw.githubusercontent.com/courseraap/capstone/main/api.js");
    const jsCode = await response.text();
    
    // Get both fetchAPI and submitAPI functions
    const createAPI = new Function(jsCode + '; return { fetchAPI, submitAPI };');
    const api = createAPI();
    window.fetchAPI = api.fetchAPI;
    window.submitAPI = api.submitAPI;
    
    if (typeof window.fetchAPI !== 'function') {
      throw new Error("fetchAPI is not defined");
    }

    const times = window.fetchAPI(date);

    if (date.getDay() === 0 || date.getDay() === 6) {
      return times.filter(t => parseInt(t, 10) < 19);
    }
    return times;
  } catch (error) {
    console.error("Error fetching initial times:", error);
    return [];
  }
}


const submitForm = async (formData) => {
  try {
    // Submit to external API
    const success = window.submitAPI ? window.submitAPI(formData) : false;
    
    if (success) {
      // Save to localStorage
      const savedReservation = saveReservation(formData);
      
      if (savedReservation) {
        console.log('Reservation saved successfully:', savedReservation);
        // Navigate to confirmation page with reservation ID
        return { success: true, reservation: savedReservation };
      } else {
        console.error('Failed to save reservation to localStorage');
        // Still return success since external API worked
        return { success: true, reservation: null };
      }
    } else {
      console.error("Failed to submit reservation to external API");
      return { success: false, error: 'Submission failed' };
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, error: error.message };
  }
}

const updateTimes = (state, action) => {
  switch(action.type) {
    case 'SET_TIMES':
      return action.times;
    default:
      return state;
  }
}

function App() {
  const navigate = useNavigate();
        
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

const [availableTimes, dispatch] = useReducer(updateTimes, []);

useEffect(()=>{
    const loadInitialTimes = async () => {
        const today = new Date();
        const times = await initialTimes(today);
        dispatch({ type: 'SET_TIMES', times });
    }

    loadInitialTimes();
},[]);

const handleFormChange = (field,value)=>{
    setForm(f => ({...f, [field]: value}));
    if (field === 'date'){
        const dateObj = new Date(value);

        initialTimes(dateObj).then(times=>{
            dispatch({ type: 'SET_TIMES', times });
        });
        setForm(f =>({...f,time:''}));
    }
};

const [currentReservation , setCurrentReservation] = useState(null);

const handleReservationSubmit = async (reservationData) => {
    setCurrentReservation(reservationData);
    
    
    const result = await submitForm(reservationData);
    
    if (result.success) {
      navigate('/booking-confirmed');
    } else {
      console.error("Failed to submit reservation");
    }
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
          <Route path="/" element={<Main className="Main" reviews={reviews} submitForm={(formData) => submitForm(formData, navigate)} />} />
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
           <Route path="/reservation/payment" element={<Payment className="Payment" reservation={currentReservation} onSubmit={setForm} />} />
           <Route path="/booking-confirmed" element={<div>Booking Confirmed!</div>} />
          <Route path="/menu" element={<Menu className="Menu" />} />
          <Route path="/about" element={<About className="about" id="about" />} />
          <Route path="/specials" element={<Specials className="specials" />} />
        </Routes>
        <Footer className="Footer" />
    </div>
  )
}

export default App

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
import { fetchAPI } from './hooks/apiFallBack';


const submitForm = async (formData) => {
 
    console.log("Submitting form data:", formData);
    return { success: true };
};




// Fixed initialTimes function
const initialTimes = () => {
    try {
        if (typeof fetchAPI === 'function') { // FIXED: === instead of !==
            const times = fetchAPI(new Date());
            return Array.isArray(times) ? times : ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
        } else {
            return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
        }
    } catch {
        return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    }
};

// Fixed reducer
const updateTimes = (state, action) => {
    switch (action.type) {
        case 'SET_TIMES':
            return action.times || [...state];
            
        case 'setByDate': { // Keep your existing action name
            const d = action.date;
            if (!(d instanceof Date) || isNaN(d)) {
                return state;
            }
            if (d.getDay() === 0 || d.getDay() === 6) {
                return state.filter(t => parseInt(t, 10) < 19);
            }
            return state;
        }
            
        default:
            return state;
    }
};

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


    const [availableTimes, dispatch] = useReducer(updateTimes, initialTimes());

    useEffect(() => {
        const loadAPIAndUpdateTimes = async () => {
            try {
                if (typeof fetchAPI !== 'function') { 
                    console.log('fetchAPI not available');
                    return;
                }
                
                const today = new Date();
                const times = fetchAPI(today);
                
                console.log('API returned times:', times);
                dispatch({ type: 'SET_TIMES', times: times });
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        loadAPIAndUpdateTimes();
    }, []); 
    
const handleFormChange = (field, value) => {
    setForm(f => ({...f, [field]: value}));
    
    if (field === 'date') {
        const dateObj = new Date(value);
        
        // First dispatch the setByDate action for immediate feedback
        dispatch({ type: 'setByDate', date: dateObj });
        
        // Then make a new API call for this specific date
        try {
            console.log('Fetching times for date:', dateObj);
            const newTimes = fetchAPI(dateObj);
            console.log('API returned times for new date:', newTimes);
            
            // Update times from API
            dispatch({ type: 'SET_TIMES', times: newTimes });
            
            // Clear time selection if no longer available
            setForm(f => ({
                ...f, 
                time: newTimes.includes(f.time) ? f.time : ''
            }));
        } catch (error) {
            console.error('Error fetching times for new date:', error);
        }
    }
};

const [currentReservation , setCurrentReservation] = useState(null);

const handleReservationSubmit = async (reservationData) => {
    setCurrentReservation(reservationData);
    
    
    const result = await submitForm(reservationData);
    
    if (result.success) {
      navigate('/reservation/payment');
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

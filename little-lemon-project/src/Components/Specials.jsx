import DishCard from './DishCard.jsx';
import Button from './Button.jsx';
import '../Styles/Specials.css';



 function Specials({className , dishes}){

   
    return (
        <section className={className}>
            <div className={`${className}-header`}>
            <h2>This Week's Specials</h2>
            <Button className="button-ct" path="/menu">Online Menu</Button>
            </div>
           <DishCard className={className} dishes={dishes} />
        </section>
    );
}

export default Specials;
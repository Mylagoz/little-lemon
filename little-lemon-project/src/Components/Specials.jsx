import Bruchetta from '../assets/bruchetta.svg';
import GreekSalad from '../assets/greek-salad.jpg';
import LemonDessert from '../assets/lemon-dessert.jpg';
import Button from './Button.jsx';




 function Specials(){

    const specials =[
        {
            title: "BRUCHETTA",
            description: "Toasted rustic bread rubbed with garlic and drizzled with olive oil. Topped with ripe tomatoes, fresh basil, and a splash of balsamic vinegar. A simple, bold Italian appetizer bursting with flavor.",
            price: 10.99,
            img:{ src:Bruchetta, alt: "Bruchetta" }
        },
        {
            title: "GREEK SALAD",
            description: "Crisp cucumbers, ripe tomatoes, and Kalamata olives mingle with creamy feta for a burst of fresh flavor. Tossed in a zesty house-made vinaigrette with oregano and olive oil.",
            price: 12.99,
            img:{ src:GreekSalad, alt: "Greek Salad" }
        },
        {
            title: "LEMON DESSERT",
            description: "Light and fluffy layers infused with fresh lemon zest and juice. Frosted with tangy lemon cream cheese icing for a perfect sweet-tart balance. A bright, citrusy finish that melts in your mouth with every bite.",
            price: 9.99,
            img:{ src:LemonDessert, alt: "Lemon Dessert" }
        }
    ]

    return (
        <section className="specials">
            <div className="specials-header">
            <h2>This Week's Specials</h2>
            <Button className="btn" path="/menu">Online Menu</Button>
            </div>
            <div className="specials-cards">
                {specials.map((special) => (
                    <article key={special.img.title}>
                        <img src={special.img.src} alt={special.img.alt} />
                        <div className="specials-card-description">
                            <h3>{special.title} <span>${special.price.toFixed(2)}</span></h3>
                            <p>{special.description}</p>
                            <a href="#">Order a delivery</a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Specials;
import '../Styles/Specials.css';

function DishCard({ dishes , className }) {
    return (
        <div className={`${className}-cards`}>
            {dishes.map((special) => (
                <article key={special.title}>
                    <img src={special.img.src} alt={special.img.alt} />
                    <div className={`${className}-card-description`}>
                        <h3>{special.title} <span>${special.price.toFixed(2)}</span></h3>
                        <p>{special.description}</p>
                        <a href="#">Order a delivery</a>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default DishCard;
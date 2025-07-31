import Food from '../assets/restauranfood.jpg';
import Bruchetta from '../assets/bruchetta.svg';
import GreekSalad from '../assets/greek-salad.jpg';
import LemonDessert from '../assets/lemon-dessert.jpg';
 function Main({ className }) {
    return (
        <main className={className}>
          <section className="hero">
            <div className="hero-text">
              <h1>Little Lemon</h1>
              <h2>Chicago</h2>
              <p>Fresh Mediterranean flavors served with warmth and flair.</p>
              <button>Reserve a Table</button>
            </div>
            <img src={Food} alt="Restaurant food" />
          </section>
          <section className="specials">
            <h2>This week specials !</h2>
            <button className="online-menu-btn">Online Menu</button>
            <div className="specials-cards">
              <article>
                <img src={Bruchetta} alt="Bruchetta" />
                <div className="specials-card-description">
                 <h3>BRUCHETTA <span>$5.99</span></h3>
                 <p>Toasted rustic bread rubbed with garlic and drizzled with olive oil. 
                   Topped with ripe tomatoes, fresh basil, and a splash of balsamic vinegar. 
                   A simple, bold Italian appetizer bursting with flavor.</p>
                 <a href="#">order a delivery</a>
                </div>
              </article>
              <article>
                <img src={GreekSalad} alt="Greek Salad" />
                <div className="specials-card-description">
                 <h3>GREEK SALAD <span>$12.99</span></h3>
                 <p>Crisp cucumbers, ripe tomatoes, and Kalamata olives mingle with creamy feta for a burst of fresh flavor.
                  Tossed in a zesty house-made vinaigrette with oregano and olive oil. 
                  A refreshing, wholesome taste of Greece in every bite.</p>
                 <a href="#">order a delivery</a>
                </div>
              </article>
              <article>
                <img src={LemonDessert} alt="Lemon Dessert" />
                <div className="specials-card-description">
                 <h3>LEMON DESSERT <span>$12.99</span></h3>
                 <p>Light and fluffy layers infused with fresh lemon zest and juice.
                    Frosted with tangy lemon cream cheese icing for a perfect sweet-tart balance.
                    A bright, citrusy finish that melts in your mouth with every bite.</p>
                <a href="#">order a delivery</a>
                </div>
              </article>
         
            </div>
          </section>
          <section className="ratings">
            <h2>Rate Us</h2>
            <div className="ratings-cards">
              {/* Repeat for each rating */}
              <div className="rating-card">Rating</div>
              {/* ... */}
            </div>
          </section>
          <section className="about">
            <div className="about-text">
              <h2>Little Lemon</h2>
              <h3>Chicago</h3>
              <p>Fresh Mediterranean flavors served with warmth and flair. A cozy atmosphere and creative cocktails make it a local favorite. Little Lemon adds a vibrant twist to classic dishes.</p>
            </div>
            <div className="about-images">
              {/* Placeholders for images */}
              <div className="about-img about-img1"></div>
              <div className="about-img about-img2"></div>
              <div className="about-img about-img3"></div>
            </div>
          </section>
        </main>
    );
    
}


export default Main;
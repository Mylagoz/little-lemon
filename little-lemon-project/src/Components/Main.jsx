import restauranfood from '../assets/restauranfood.jpg';
 function Main({ className }) {
    return (
        <main className={className}>
            <article>
                <section>
                    <h1>Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p>Family owned Mediterranean restaurant , 
                    focused on traditional recipes with a modern twist</p>
                    <button>Reserve a Table</button>
                </section>
                <section>
                  <img src={restauranfood} alt="Cooker with a food presentation" />
                </section>
            </article>
            <article>
                 <section>
                   
                 </section>
            </article>
            
            
        </main>
    );
    
}


export default Main;
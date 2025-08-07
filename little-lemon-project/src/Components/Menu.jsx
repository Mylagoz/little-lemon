import '../Styles/Menu.css';
import DishCard from './DishCard.jsx';
import LemonDessert from '../assets/lemon-dessert.jpg';
import GreekSalad from '../assets/greek-salad.webp';
import Bruchetta from '../assets/bruchetta.webp';
import Tiramisu from '../assets/tiramisu.webp';
import PannaCotta from '../assets/panna-cotta.webp';
import MargheritaPizza from '../assets/margherita-pizza.webp';
import SpaghettiCarbonara from '../assets/spaghetti-carbonara.webp';


function Menu () {

  const menuItems = [
    {
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
      price: 12.99,
      img: { src: SpaghettiCarbonara , alt: "Spaghetti Carbonara" }
    },
    {
      title: "Margherita Pizza",
      description: "Traditional pizza topped with fresh tomatoes, mozzarella cheese, and basil.",
      price: 10.99,
      img: { src: MargheritaPizza, alt: "Margherita Pizza" }
    },
    {
      title: "Tiramisu",
      description: "Coffee-flavored Italian dessert made with mascarpone cheese and ladyfingers.",
      price: 6.99,
      img: { src: Tiramisu, alt: "Tiramisu" }
    },
    {
      title: "Greek Salad",
      description: "Crisp cucumbers, ripe tomatoes, and Kalamata olives mingle with creamy feta for a burst of fresh flavor. Tossed in a zesty house-made vinaigrette with oregano and olive oil.",
      price: 12.99,
      img: { src: GreekSalad, alt: "Greek Salad" }
    },
    {
      title: "Bruschetta",
      description: "Toasted bread topped with diced tomatoes, garlic, basil, and olive oil.",
      price: 5.99,
      img: { src: Bruchetta, alt: "Bruschetta" }
    },
    {
      title: "Panna Cotta",
      description: "Creamy Italian dessert made with sweetened cream thickened with gelatin.",
      price: 7.99,
      img: { src: PannaCotta, alt: "Panna Cotta" }
    },
    {
      title: "Lemon Dessert",
      description: "Light and fluffy layers infused with fresh lemon zest and juice. Frosted with tangy lemon cream cheese icing for a perfect sweet-tart balance. A bright, citrusy finish that melts in your mouth with every bite.",
      price: 4.99,
      img: { src: LemonDessert, alt: "Lemon Dessert" }
    }

  ]

  return (
    <section className="menu">
      <h2>Menu</h2>
      <div className="menu-items">
         <DishCard className="specials" dishes={menuItems} />
       </div>
    </section>
  );

}
export default Menu;
function Menu () {

  const menuItems = [
    {
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
      price: 12.99
    },
    {
      title: "Margherita Pizza",
      description: "Traditional pizza topped with fresh tomatoes, mozzarella cheese, and basil.",
      price: 10.99
    },
    {
      title: "Tiramisu",
      description: "Coffee-flavored Italian dessert made with mascarpone cheese and ladyfingers.",
      price: 6.99
    },
    {
      title: "Greek Salad",
      description: "Crisp cucumbers, ripe tomatoes, and Kalamata olives mingle with creamy feta for a burst of fresh flavor. Tossed in a zesty house-made vinaigrette with oregano and olive oil.",
      price: 12.99
    },
    {
      title: "Bruschetta",
      description: "Toasted bread topped with diced tomatoes, garlic, basil, and olive oil.",
      price: 5.99
    },
    {
      title: "",
      description: "Creamy Italian dessert made with sweetened cream thickened with gelatin.",
      price: 7.99
    },
    {
      title: "Lemon Dessert",
      description: "Light and fluffy layers infused with fresh lemon zest and juice. Frosted with tangy lemon cream cheese icing for a perfect sweet-tart balance. A bright, citrusy finish that melts in your mouth with every bite.",
      price: 4.99
    }

  ]

  return (
    <section className="menu">
      <h2>Menu</h2>
      <div className="menu-items">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span>${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </section>
  );

}
export default Menu;
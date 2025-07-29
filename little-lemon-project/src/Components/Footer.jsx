
function Footer({ className }) {
    return (
        <footer className={className}>
         <div>
          <h5>Doormat</h5>
             <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#menu">About</a></li>
                <li><a href="#about">Menu</a></li>
                <li><a href="#reservation">Reservation</a></li>
                <li><a href="#order_online">Order Online</a></li>
                <li><a href="#login">Login</a></li>
             </ul>
         </div>
          <div>   
             <h5>Social Media</h5>
                <ul>
                    <li><a href="#facebook">Facebook</a></li>
                    <li><a href="#twitter">Twitter</a></li>
                    <li><a href="#instagram">Instagram</a></li>
                </ul>
            </div>    

               <div> 
                <h5>Contact</h5>
                <ul>
                    <li><a href="#address">Address</a></li>
                    <li><a href="#phone">Phone</a></li>
                    <li><a href="#email">Email</a></li>
                </ul>
               </div> 
             </footer>
       

    )
}


export default Footer;
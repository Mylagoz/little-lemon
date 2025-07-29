
     import Logo from '../assets/Logo.svg'
     
     function Header({className}) {
        return (
            <header className={className}>
                 <img src={Logo}/>
            </header>
        );
    }

    export default Header;
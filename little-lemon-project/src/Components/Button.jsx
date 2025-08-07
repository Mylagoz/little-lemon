import { Link } from 'react-router-dom';
import '../Styles/Button.css'; 
function Button ({children, className,path}){


    return(
        <Link className={className} to={path}>{children}</Link>
    )
}

export default Button;
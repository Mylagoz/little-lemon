import { Link } from 'react-router-dom'

function Button ({children, className,path}){
    return(
        <Link className={className} to={path}>{children}</Link>
    )
}

export default Button;
import {Link} from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import './NoMatch.scss'


const NoMatch = () => {
    return (
        <div>
            <NavBar/>
            <div className='no-match'>
                <h1>404</h1>
                <p>Page not found</p >
                <h2>
                    <Link to="/">Go Home</Link>
                </h2 >
            </div>

        </div>
    )
}

export default NoMatch
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

function NavBar() {
    const auth = useContext(AuthContext);

    return <nav className="navbar navbar-expand-lg navbar-light bg-ligh">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            {auth.user.username !== "" ? (
                <li className="nav-item"><span className="navbar-text">Hello {auth.user.username}! <button onClick={() => auth.logout()} className="btn btn-info">Logout</button></span></li>
            ) : <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>}
        </ul>

    </nav>
}

export default NavBar;
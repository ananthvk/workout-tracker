import { Link } from "react-router-dom";

const Navbar = () => {
    return <div>
        <Link to="/">Home</Link>
        <Link to="/exercises">Exercises</Link>
    </div>
}

export default Navbar;
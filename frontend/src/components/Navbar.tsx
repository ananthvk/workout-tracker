import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts"
const Navbar = () => {
    const [loginToken, _] = useLocalStorage("token", "")

    return <nav className="bg-gray-50 border-gray-500 p-2 flex justify-between align-middle">
        <Link to="/" style={{ width: "100%", display: 'flex', alignContent: 'center' }}>
            <button className="text-2xl font-bold bg-gradient-to-r from-green-500 to-cyan-400 inline-block text-transparent bg-clip-text duration-700 hover:from-green-500 hover:to-cyan-500">
                Workout tracker
            </button>
        </Link>
        <div className="flex p-2">
            <Link to="/exercises">
                <button className="p-2 font-semibold text-gray-700 hover:text-gray-800 duration-500"> Exercises </button>
            </Link>
            {!loginToken ?
                <Link to="/login">
                    <button className="text-white bg-blue-600 p-2 rounded-lg hover:bg-blue-700 duration-500 font-semibold" >
                        Login
                    </button>
                </Link>
                :
                <Link to="/logout">
                    <button className="text-white bg-blue-600 p-2 rounded-lg hover:bg-blue-700 duration-500 font-semibold">
                        Logout
                    </button>
                </Link>
            }
        </div>
    </nav>
}

export default Navbar;
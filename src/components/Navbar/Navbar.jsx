import { useSelector,useDispatch } from "react-redux"
import { enableDarkMode,disableDarkMode } from "../../features/app/appSlice"
import "./Navbar.css"
function Navbar (){
    const dispatch = useDispatch()
    const {darkMode} = useSelector((store)=>store.app)
    return(
        <nav className="navbar">
            <div className="nav-header">
                API Tester
            </div>
            <button value={darkMode} onClick={()=>{
                darkMode? dispatch(dispatch(disableDarkMode())): dispatch(enableDarkMode())
                }} >DarkMode</button>

        </nav>
        )
}

export default Navbar
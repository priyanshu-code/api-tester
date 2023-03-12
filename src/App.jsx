import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getAuth } from "./features/app/appSlice"
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import UserAPIs from "./components/User/UserAPIs"
import "./App.css"
const App =() =>{
    const {current,isAuthenticated} = useSelector((store)=>store.app)
    console.log(current)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAuth())
    },[dispatch])
    return (
        <main>
        <Navbar />
        <div className="container">
            {current==="Home" && <Home />}
            {current==="Register" && <Register />}
            {current==="Login" && <Login />} 
            {current==="UserAPIs" && <UserAPIs />} 
        </div>
        </main>
    )
}
export default App
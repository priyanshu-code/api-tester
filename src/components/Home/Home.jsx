import { useSelector,useDispatch } from "react-redux"
import { changeCurrent } from "../../features/app/appSlice"
import "./Home.css"
const Home = ()=>{
    const dispatch = useDispatch()
    const {darkMode,isAuthenticated} = useSelector((store)=>store.app)
    console.log(isAuthenticated)
    return(
    <main>
        <h1 className="home-h1">Welcome to API Tester you can test your APIs here</h1>
        <p className="home-p">Please click here to continue</p><button className="home-button" onClick={()=>{
            if (isAuthenticated){
            dispatch(changeCurrent("UserAPIs"))
            }
            else{
            dispatch(changeCurrent("Login"))
            }
            }}>Test API</button>
    </main>)
}

export default Home
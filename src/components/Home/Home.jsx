import { useSelector,useDispatch } from "react-redux"
import { changeCurrent } from "../../features/app/appSlice"
const Home = ()=>{
    const dispatch = useDispatch()
    const {darkMode,isAuthenticated} = useSelector((store)=>store.app)
    console.log(isAuthenticated)
    return(
    <main>
        <h1>Welcome to API Tester you can test your API(s) here</h1>
        <p>Please click here to continue</p><button onClick={()=>{
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
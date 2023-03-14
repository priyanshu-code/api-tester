import { useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { changeCurrent,loginUser } from "../../features/app/appSlice"
import "./Register.css"
const Login = ()=>{
    const [form,setForm] = useState({email:"",password:""})
    const {darkMode} = useSelector((store)=>store.app)
    const dispatch = useDispatch()
    function handleChange(e){
        const {name,value}= e.target
        setForm((prev)=>{return{...prev,[name]:value}})
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(loginUser(form))
    }
    return(
        <div className="register flex-col">
            <form action="" method="" className="register-form flex-col" onSubmit={handleSubmit}>
                <label htmlFor="email">e-mail: </label>
                <input onChange={handleChange} value={form.email} name="email" type="email" placeholder="example@gmail.com"></input>
                <label htmlFor="password">Password: </label>
                <input onChange={handleChange} value={form.password} name="password" type="password" placeholder="Password"></input>
                <input type="submit" value="Submit"></input>
            </form>
            <a href="" onClick={(e)=>{
                e.preventDefault()
                dispatch(changeCurrent("Register"))}
                }>Not Registered?</a>
        </div>
    )
    
}

export default Login
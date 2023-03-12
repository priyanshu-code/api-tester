import { useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { changeCurrent,registerUser } from "../../features/app/appSlice"
import "./Register.css"
const Register = ()=>{
    const [form,setForm] = useState({username:"",firstName:"",lastName:"",email:"",password:""})
    const {darkMode} = useSelector((store)=>store.app)
    const dispatch = useDispatch()
    function handleChange(e){
        const {name,value}= e.target
        setForm((prev)=>{return{...prev,[name]:value}})
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(registerUser(form))
    }
    return(
        <div className="register flex-col">
            <form action="" method="POST" className="register-form flex-col" onSubmit={handleSubmit}>
                <label htmlFor="username">username: </label>
                <input onChange={handleChange} value={form.username} name="username" placeholder="username"></input>
                <label htmlFor="firstName">First name: </label>
                <input onChange={handleChange} value={form.firstName} name="firstName" placeholder="First Name"></input>
                <label htmlFor="lastName">Last name: </label>
                <input onChange={handleChange} value={form.lastName} name="lastName" placeholder="Last Name"></input>
                <label htmlFor="email">E-mail: </label>
                <input onChange={handleChange} value={form.email} name="email" type="email" placeholder="example@gmail.com"></input>
                <label htmlFor="password">Password: </label>
                <input onChange={handleChange} value={form.password} name="password" type="password" placeholder="Password"></input>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
    
}

export default Register
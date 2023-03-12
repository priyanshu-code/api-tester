import { useState,useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { updateAPI,deleteAPI, setCurrentAPI } from "../../features/user/userAPIsSlice"
const SingleAPI =()=>{
    const dispatch = useDispatch()
    // const {darkMode} = useSelector((store)=>store.app)
    const {userAPIs,isLoading,currentAPI} = useSelector((store)=>store.userAPIs)
    const [customForm,setCustomForm] = useState({APIName:"",url:"",method:"",APIHeaders:[]})
    const [APIHeaders,setAPIHeaders] = useState([])
    
    useEffect(()=>{
        if (currentAPI!==""){
        const temp = userAPIs.find((item)=>item._id===currentAPI)
        setCustomForm(temp)
        setAPIHeaders(temp.APIHeaders)
    }
        console.log("I RAN")
    },[currentAPI,userAPIs])
    if (isLoading){
        return <h1>Loading</h1>
    }
    function handleChange(e){
        const {name,value}= e.target
        setCustomForm((prev)=>{return{...prev,[name]:value}})
    }
    function addHeader(e){
        e.preventDefault()
        setAPIHeaders((prev)=>[...prev,{headerName:"",headerValue:""}])
    }
    function removeHead(e){
        e.preventDefault()
        const {id} = e.target
        const  temp = APIHeaders.filter((item,tempId)=>tempId!==Number(id))
        setAPIHeaders(temp)
        dispatch(updateAPI({customForm,APIHeaders,currentAPI,id}))
    }
    function handleHeaders(e){
        const {name,value,id} =e.target
        const temp = APIHeaders.find((item,tempId)=>tempId===Number(id))
        if (name==='headerName'){
            temp.headerName = value
        }else{
            temp.headerValue = value
        }
        const tempArr = APIHeaders.map((item,tempId)=>{
            if (tempId===Number(id)){
                return temp
            }
            return item
        })
        setAPIHeaders(tempArr)
    }
    return(
        <div className="single-user-api">
            <form action="" className="main-form flex-col">
                <div className="flex-row">
                    <label htmlFor="APIName">name: </label>
                    <input placeholder="name" onChange={handleChange} value={customForm.APIName} type="text" name="APIName"/>
                </div>
                <div className="flex-row">
                    <label htmlFor="url">URL: </label>
                    <input placeholder="url" onChange={handleChange} value={customForm.url} type="text" name="url"/>
                </div>
                <div className="flex-row">
                    <label htmlFor="method">Method: </label>
                    <select name ="method" onChange={handleChange} value={customForm.method}>
                        <option value={"GET"}>GET</option>
                        <option value={"POST"}>POST</option>
                        <option value={"PATCH"}>PATCH</option>
                        <option value={"PUT"}>PUT</option>
                        <option value={"DELETE"}>DELETE</option>
                    </select>
                </div>
                <div className="flex-row">
                    <label htmlFor="APIHeaders">Headers:</label><button onClick={addHeader}>+</button>
                </div>
                {APIHeaders.length>0 && <div className="flex-col header-container">
                    {APIHeaders.map((item,id)=>{
                        return(
                            <div key={id} className="flex-row" >
                                <input className="header-inputs" id={id} onChange={handleHeaders} value={APIHeaders[id].headerName} type="text" name="headerName" placeholder="headerName"/>
                                <input className="header-inputs" id={id} onChange={handleHeaders} value={APIHeaders[id].headerValue} type="text" name="headerValue" placeholder="headerValue"/>
                                <button id={id} onClick={removeHead}>X</button>
                            </div>
                        )
                    })}
                </div>}
                <div className="flex-row form-buttons">
                    <button>Test API</button>
                    <button onClick={()=>dispatch(updateAPI({customForm,APIHeaders,currentAPI}))}>Save API</button>
                    <button onClick={()=>dispatch(deleteAPI(currentAPI))}>Delete API</button>
                </div>
            </form>
            </div>
    )
}
export default SingleAPI
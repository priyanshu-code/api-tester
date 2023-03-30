import { useState,useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { updateAPI,deleteAPI, createAPI,setTestData } from "../../features/user/userAPIsSlice"
import { HandleTest } from "./HandleTest"
const SingleAPI =()=>{
    const dispatch = useDispatch()
    const {errors,userAPIs,currentAPI,isAPILoading,testData} = useSelector((store)=>store.userAPIs)
    const [customForm,setCustomForm] = useState({APIName:"",url:"",method:"GET",APIHeaders:[],fields:[]})
    const [APIHeaders,setAPIHeaders] = useState([])
    const [fields,setFields] = useState([])
    if (errors){
        console.log(errors)
    }
    useEffect(()=>{
        if (currentAPI!=="Create"){
        const temp = userAPIs.find((item)=>item._id===currentAPI)
        setCustomForm(temp)
        setAPIHeaders(temp.APIHeaders)
        setFields(temp.fields)
    }
    if (currentAPI==="Create"){
        setCustomForm({APIName:"",url:"",method:"GET",APIHeaders:[]})
        setAPIHeaders([])
        setFields([])
    }
    console.log("I RAN")
},[currentAPI,userAPIs])
    if (isAPILoading){
        return(
            <div className="single-user-api">
            <h1>Loading</h1>
            </div>
        )
    }
    function handleChange(e){
        const {name,value}= e.target
        setCustomForm((prev)=>{return{...prev,[name]:value}})
    }
    function addHeader(e){
        e.preventDefault()
        setAPIHeaders((prev)=>[...prev,{headerName:"",headerValue:""}])
    }
    function addField(e){
        e.preventDefault()
        setFields((prev)=>[...prev,{fieldName:"",fieldValue:""}])
    } 
    function removeHead(e){
        e.preventDefault()
        const {value,name,id} = e.target
        if(value===""&&name===""){
            const  temp = APIHeaders.filter((item,tempId)=>tempId!==Number(id))
            setAPIHeaders(temp)
        }
    }
    function removeField(e){
        e.preventDefault()
        const {id} = e.target
            const  temp = fields.filter((item,tempId)=>tempId!==Number(id))
            setFields(temp)
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
    function handleFields(e){
        const {name,value,id} =e.target
        const temp = fields.find((item,tempId)=>tempId===Number(id))
        if (name==='fieldName'){
            temp.fieldName = value
        }else{
            temp.fieldValue = value
        }
        const tempArr = fields.map((item,tempId)=>{
            if (tempId===Number(id)){
                return temp
            }
            return item
        })
        setFields(tempArr)
    }
    return(
        <div className="single-user-api">
            <form action="" className="main-form flex-col">
                <div className="flex-row">
                    <label htmlFor="APIName">name: </label>
                    <input className="single-api-input" placeholder="name" onChange={handleChange} value={customForm.APIName} type="text" name="APIName"/>
                </div>
                <div className="flex-row">
                    <label htmlFor="url">URL: </label>
                    <input className="single-api-input" placeholder="url" onChange={handleChange} value={customForm.url} type="text" name="url"/>
                </div>
                <div className="flex-row">
                    <label htmlFor="method">Method: </label>
                    <select name ="method" onChange={handleChange} value={customForm.method}>
                        <option value={"GET"}>GET</option>
                        <option value={"POST"}>POST</option>
                        <option value={"PATCH"}>PATCH</option>
                        <option value={"DELETE"}>DELETE</option>
                    </select>
                </div>
                <div className="flex-row">
                    <label htmlFor="APIHeaders">Headers:</label><button onClick={addHeader}>+</button>
                    <label htmlFor="fields">Fields:</label><button onClick={addField}>+</button>
                </div>
                
                {APIHeaders.length>0 && <div className="flex-col header-container">
                    {APIHeaders.map((item,id)=>{
                        return(
                            <div key={id} className="flex-row" >
                                Header:                            
                                <input className="header-inputs" id={id} onChange={handleHeaders} value={APIHeaders[id].headerName} type="text" name="headerName" placeholder="headerName"/>
                                <input className="header-inputs" id={id} onChange={handleHeaders} value={APIHeaders[id].headerValue} type="text" name="headerValue" placeholder="headerValue"/>
                                <button id={id} onClick={removeHead}>X</button>
                            </div>
                        )
                    })}
                </div>}
                {fields.length>0 && <div className="flex-col header-container">
                    {fields.map((item,id)=>{
                        return(
                            <div key={id} className="flex-row" >
                                Field:
                                <input className="header-inputs" id={id} onChange={handleFields} value={fields[id].fieldName} type="text" name="fieldName" placeholder="Field Name"/>
                                <input className="header-inputs" id={id} onChange={handleFields} value={fields[id].fieldValue} type="text" name="fieldValue" placeholder="Value"/>
                                <button id={id} onClick={removeField}>X</button>
                            </div>
                        )
                    })}
                </div>}
                <div className="flex-row form-buttons">
                    <button onClick={async(e)=>{
                        e.preventDefault()
                        dispatch(updateAPI({customForm,APIHeaders,currentAPI,fields}))
                        const tempData = await HandleTest(customForm)
                        dispatch(setTestData(tempData))
                    }
                        }>Test API</button>
                    <button onClick={(e)=>{
                        e.preventDefault()
                        if (currentAPI==="Create"){
                            dispatch(createAPI({customForm,APIHeaders,fields}))
                        }
                        else{
                            dispatch(updateAPI({customForm,APIHeaders,currentAPI,fields}))
                        }
                        }}>Save API</button>
                    <button onClick={(e)=>{
                        e.preventDefault()
                        dispatch(deleteAPI(currentAPI))}
                        }>Delete API</button>
                </div>
            </form>
            </div>
    )
}
export default SingleAPI
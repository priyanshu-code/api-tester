import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getAllAPIs,createAPI,updateAPI,deleteAPI,setIsLoading,setCurrentAPI,getUser } from "../../features/user/userAPIsSlice"
import SingleAPI from "./SingleAPI"
import "./UserAPIs.css"
function UserAPIs (){
    const dispatch = useDispatch()
    const {darkMode} = useSelector((store)=>store.app)
    const {userAPIs,isLoading,errors,user,currentAPI,testData} = useSelector((store)=>store.userAPIs)
    useEffect(()=>{        
        dispatch(getAllAPIs())
        dispatch(getUser())
        console.log("I ran")
    },[dispatch])

    if (isLoading){
        return(
            <h1>Loading</h1>
        )
    }
    console.log({"asmd":"asjd","asmd":"asjd","asmd":"asjd","asmd":"asjd","asmd":"asjd"}.length)
    console.log(["asmd","asmd","asmd","asmd","asmd","asmd","asmd","asmd","asmd","asmd","asmd"].length)
    console.log(typeof "")
    console.log(typeof 1)
    if(testData!==[]){
        console.log(Object.keys(testData))
        console.log(testData[Object.keys(testData)[0]])
    }
    return(
    <div>
        <h1 className="greeting">Welcome {user.username}</h1>
    <main>
        <div className="user-api-container flex-row">
            <div className="user-api-buttons flex-col">
                <button className="user-api-buttons-create" onClick={()=>dispatch(setCurrentAPI("Create"))}>Create New API</button>
                {userAPIs.map((item)=>{
                    const {APIName,_id} = item
                    const current = currentAPI===_id?"user-api-buttons-btn current":"user-api-buttons-btn"
                    return(
                        <button className={current}  onClick={()=>{return dispatch(setCurrentAPI(_id))}}>
                            {APIName}
                        </button>
                    )
                })}
            </div>
            <SingleAPI />
        </div>
    </main>

    </div>
        )
}

export default UserAPIs
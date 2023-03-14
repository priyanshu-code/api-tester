import axios from "axios"
export const HandleTest = async (args)=>{
    const {APIName,url,method,APIHeaders,fields} = args
    let testFields ={}
    fields.map((item)=>{
        testFields = {...testFields,[item.fieldName]:item.fieldValue}
    })
    let headers  ={} 
    APIHeaders.map((item)=>{
            headers = {...headers,[item.headerName]:item.headerValue}
        })
    if (method==="GET"){
        try {
            const response = await axios.get(url,{headers:headers})
            const data = await response.data
            return data
        } catch (error) {
            return error.response
        }
    }
    if (method==="POST"){
        try {
            const response = await axios.post(url,testFields,{headers})
            const data = await response.data
            return data
        } catch (error) {
            return error.response
        }
    }
    if (method==="PUT"){
        try {
            const response = await axios.put(url,testFields,{headers})
            const data = await response.data
            return data
        } catch (error) {
            return error.response
        }
    }
    if (method==="DELETE"){
        try {
            const response = await axios.delete(url,{headers})
            const data = await response.data
            return data
        } catch (error) {
            return error.response
        }
    }
    if (method==="PATCH"){
        try {
            const response = await axios.patch(url,testFields,{headers})
            const data = await response.data
            return data
        } catch (error) {
            return error.response
        }
    }
}
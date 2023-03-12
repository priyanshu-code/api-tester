import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { url } from "../app/appSlice";
// const url = "https://api-tester-0ntm.onrender.com/api/v1"
const initalState = {
    user:{},
    userAPIs:[],
    isLoading:true,
    currentAPI:"",
    errors:""
}
const setHeader = (token)=>{
    return {headers:{
        'Authorization':`Bearer ${token}`
    }}
}
// get user
export const getUser = createAsyncThunk('/user/getUser',
async (args,thunkAPI)=>{
    try {
        const token =thunkAPI.getState('app').app.token
        const response = await Axios.get(url+"/auth/user",setHeader(token))
        return  thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})
// get all APIs
export const getAllAPIs = createAsyncThunk('/user/getAllAPIs',
async (args,thunkAPI)=>{
    try {
        const token =thunkAPI.getState('app').app.token
        const response = await Axios.get(url+"/userAPI",setHeader(token))
        return  thunkAPI.fulfillWithValue(response.data.api)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})
// get single api || should I even Implemenet it?
export const getSingleAPI = createAsyncThunk('/user/getSingleAPI',
async (id,thunkAPI)=>{
    try {
        const token =thunkAPI.getState('app').app.token
        const response = await Axios.get(url+`/userAPI/${id}`,setHeader(token))
        return  response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})
// create new API || add Dispatch
export const createAPI = createAsyncThunk('/user/createAPI',
async (id,data,thunkAPI)=>{
    try {
        const token =thunkAPI.getState('app').app.token
        const response = await Axios.post(url+`/userAPI/${id}`,data,setHeader(token))
        return  response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})
// update API || add Dispatch
export const updateAPI = createAsyncThunk('/user/updateAPI',
async (data,thunkAPI)=>{
    try {
        const {customForm,APIHeaders,currentAPI,id} =data
        let temp
        if (id){
         temp= {...customForm,APIHeaders:APIHeaders.filter((item,itemId)=>{
            return itemId!==Number(id)})}
        }else{
            temp = customForm
        }
        const token =thunkAPI.getState('app').app.token
        const response = await Axios.patch(url+`/userAPI/${currentAPI}`,temp,setHeader(token))
        thunkAPI.dispatch(getAllAPIs())
        return  response.data
    } catch (error) {
        console.log(error.response)
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})
// delete API || add Dispatch
export const deleteAPI = createAsyncThunk('/user/deleteAPI',
async (id,thunkAPI)=>{
    try {
        const token =thunkAPI.getState('app').app.token
        const response = await Axios.delete(url+`/userAPI/${id}`,setHeader(token))
        await thunkAPI.dispatch(getAllAPIs())
        return  response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})
const userAPIsSlice = createSlice({
    name:"userAPIs",
    initialState:initalState,
    reducers:{
        setIsLoading:(state,actions)=>{
            state.isLoading=actions.payload
        },
        setCurrentAPI:(state,actions)=>{
            state.currentAPI=actions.payload
        }
    },
    extraReducers:{
        //get User
        [getUser.pending]:(state)=>{
            state.isLoading = true
        },
        [getUser.fulfilled]:(state,actions)=>{
            state.user = actions.payload
            state.isLoading = false
        },
        [getUser.rejected]:(state,actions)=>{
            state.errors = actions.payload
            state.isLoading = false
        },
        //get all APIs
        [getAllAPIs.pending]:(state)=>{
            state.isLoading = true
        },
        [getAllAPIs.fulfilled]:(state,actions)=>{
            state.userAPIs = actions.payload
            state.isLoading = false
        },
        [getAllAPIs.rejected]:(state,actions)=>{
            state.errors = actions.payload
            state.isLoading = false
        },
        // create API
        [createAPI.pending]:(state)=>{
            state.isLoading = true
        },
        [createAPI.fulfilled]:(state)=>{
            state.isLoading = false
        },
        [createAPI.rejected]:(state,actions)=>{
            state.errors = actions.payload
            state.isLoading = false
        },
        // update API
        [updateAPI.pending]:(state)=>{
            state.isLoading = false
        },
        [updateAPI.fulfilled]:(state)=>{
            state.isLoading = false
        },
        [updateAPI.rejected]:(state,actions)=>{
            state.errors = actions.payload
            state.isLoading = false
        },
        //delete API
        [deleteAPI.pending]:(state)=>{
            state.isLoading = false
        },
        [deleteAPI.fulfilled]:(state,actions)=>{
            state.isLoading = false
        },
        [deleteAPI.rejected]:(state,actions)=>{
            state.isLoading = false
            state.errors = actions.payload
        }
    }
})

export const {setIsLoading,setCurrentAPI} = userAPIsSlice.actions
export default userAPIsSlice.reducer
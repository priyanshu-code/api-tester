import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { url } from "../app/appSlice";
// const url = "https://api-tester-0ntm.onrender.com/api/v1"
const initalState = {
    user:{},
    userAPIs:[],
    isLoading:true,
    isAPILoading:true,
    currentAPI:"Create",
    errors:"",
    testData:[]
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
async (data,thunkAPI)=>{
    try {
        const {customForm,APIHeaders,fields}= data
        const temp = {...customForm,APIHeaders:APIHeaders,fields:fields}
        const token =thunkAPI.getState('app').app.token
        const response = await Axios.post(url+`/userAPI/`,temp,setHeader(token))
        await thunkAPI.dispatch(getAllAPIs())
        return  response.data
    } catch (error) {
        console.log(error.response)
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})
// update API || add Dispatch
export const updateAPI = createAsyncThunk('/user/updateAPI',
async (data,thunkAPI)=>{
    try {
        const {customForm,APIHeaders,currentAPI,fields} =data
        const temp = {...customForm,APIHeaders:APIHeaders,fields:fields}
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
        console.log(id)
        if (id==="Create"){
            thunkAPI.rejectWithValue("Please save the API first, to delete")
        }
        const token =thunkAPI.getState('app').app.token
        await Axios.delete(url+`/userAPI/${id}`,setHeader(token))
        thunkAPI.dispatch(getAllAPIs())
        thunkAPI.dispatch(setCurrentAPI("Create"))
        return  thunkAPI.fulfillWithValue("SUCCESS")
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
        },setTestData:(state,actions)=>{
            state.testData = actions.payload
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
            state.isLoading = false
            state.errors = actions.payload
        },
        //get all APIs
        [getAllAPIs.pending]:(state)=>{
            state.isAPILoading = true
        },
        [getAllAPIs.fulfilled]:(state,actions)=>{
            state.isAPILoading = false
            state.userAPIs = actions.payload
        },
        [getAllAPIs.rejected]:(state,actions)=>{
            state.isAPILoading = false
            state.errors = actions.payload
        },
        // create API
        [createAPI.pending]:(state)=>{
            state.isAPILoading = true
        },
        [createAPI.fulfilled]:(state,actions)=>{
            state.isAPILoading = false
            state.currentAPI = actions.payload.api._id
        },
        [createAPI.rejected]:(state,actions)=>{
            state.isAPILoading = false
            state.errors = actions.payload
        },
        // update API
        [updateAPI.pending]:(state)=>{
            state.isAPILoading = true
        },
        [updateAPI.fulfilled]:(state,actions)=>{
            state.isAPILoading = false
            state.currentAPI = actions.payload.api._id
        },
        [updateAPI.rejected]:(state,actions)=>{
            state.isAPILoading = false
            state.errors = actions.payload
        },
        //delete API
        [deleteAPI.pending]:(state)=>{
            state.isAPILoading = false
            state.createAPI = "Create"
        },
        [deleteAPI.fulfilled]:(state,actions)=>{
            state.isAPILoading = false
        },
        [deleteAPI.rejected]:(state,actions)=>{
            state.isAPILoading = false
            state.errors = actions.payload
        }
    }
})

export const {setIsLoading,setCurrentAPI,setTestData} = userAPIsSlice.actions
export default userAPIsSlice.reducer
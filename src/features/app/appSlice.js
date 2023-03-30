import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
export const url = "http://localhost:5000/api/v1"
// const url = "https://api-tester-0ntm.onrender.com/api/v1"
const initalState = {
    isAuthenticated:false,
    current:"UserAPIs",
    isLoading:true,
    token:localStorage.getItem("Token") || "",
    errors:""
}
// initial Auth
export const getAuth = createAsyncThunk('/auth/getAuth',
async (args,thunkAPI)=>{
    try {
        const token =thunkAPI.getState('app').app.token
        await Axios.get(url+"/auth",{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        return  thunkAPI.fulfillWithValue("authorized")
    } catch (error) {
        return thunkAPI.rejectWithValue("unauthorized")
    }
})
// register User
export const registerUser = createAsyncThunk('/auth/registerUser',
async (user,thunkAPI)=>{
    try {
        const response = await Axios.post(url+"/auth/register",user)
        return  response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})
// login User
export const loginUser = createAsyncThunk('/auth/loginUser',
async (user,thunkAPI)=>{
    try {
        const response = await Axios.post(url+"/auth/login",user)
        return  response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})
const appSlice = createSlice({
    name:"app",
    initialState:initalState,
    reducers:{
        changeCurrent:(state,actions)=>{
            state.current = actions.payload
        },
        setIsLoading:(state,actions)=>{
            state.isLoading=actions.payload
        }
    },
    extraReducers:{
        //inital Auth
        [getAuth.pending]:(state)=>{
            state.isAuthenticated =false
        },
        [getAuth.fulfilled]:(state,actions)=>{
            state.isAuthenticated =true
        },
        [getAuth.rejected]:(state)=>{
            state.isAuthenticated =false
        },
        // register User
        [registerUser.pending]:(state)=>{
            state.isAuthenticated =false
            state.token = ""
            localStorage.setItem("Token","")
        },
        [registerUser.fulfilled]:(state,actions)=>{
            state.isAuthenticated =true
            state.token = actions.payload.token
            localStorage.setItem("Token",actions.payload.token)
            state.current = "UserAPIs"
        },
        [registerUser.rejected]:(state,actions)=>{
            state.isAuthenticated =false
            state.token = ""
            localStorage.setItem("Token","")
            state.errors = actions.payload.startsWith('Please')?"Please Provide all fields":actions.payload
        },
        //login User
        [loginUser.pending]:(state)=>{
            state.isAuthenticated =false
            state.token = ""
            localStorage.setItem("Token","")
        },
        [loginUser.fulfilled]:(state,actions)=>{
            state.isAuthenticated =true
            state.token = actions.payload.token
            localStorage.setItem("Token",actions.payload.token)
            state.current = "UserAPIs"
        },
        [loginUser.rejected]:(state,actions)=>{
            state.isAuthenticated =false
            state.token = ""
            localStorage.setItem("Token","")
            state.errors = actions.payload.startsWith('Please')?"Please Provide all fields":actions.payload
        }
    }
})

export const {changeCurrent,setIsLoading} = appSlice.actions
export default appSlice.reducer
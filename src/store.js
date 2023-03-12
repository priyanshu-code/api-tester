import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./features/app/appSlice";
import userAPIsSlice from "./features/user/userAPIsSlice";
const store  = configureStore({
    reducer:{
        app:appSlice,
        userAPIs:userAPIsSlice
    }
})

export default store
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

const technestStore = configureStore({
    reducer:{
        user:userReducer,
        cart:cartReducer
    }
});
export default technestStore;
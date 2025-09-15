import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        id:"",
        name:"",
        email:"",
        role:"",
        isLoggedIn:false
    },
    reducers:{
        setUser:(state,action)=>{
            const {_id,email,name,role} = action.payload;
            state.id = _id;      
            state.name = name;
            state.email = email;
            state.role = role;
            state.isLoggedIn = true;
        },
        logoutUser:(state,action)=>{
            state.id = "";      
            state.name = "";
            state.email = "";
            state.role = "";
            state.isLoggedIn = false;
        }
    }
})
export const {setUser,logoutUser} = userSlice.actions;
export default userSlice.reducer;
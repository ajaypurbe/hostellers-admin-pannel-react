import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../helpers/Api";

const getCurrentUserUrl = "/user/details";

export const getCurrentUser = createAsyncThunk(
    "getCurrentUser",
    async ()=>{
        const response = await Api.get(getCurrentUserUrl,{withCredentials:true});
        return response.data;
    }
)

const initialState = { 
    isLoading: false,
    user: {}
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers: {
        [getCurrentUser.pending]: (state)=> {
           console.log("Pending");
        },
        
        [getCurrentUser.fulfilled]: (state, {payload})=> {
            // console.log("this is getcureent user Fulfilled", payload)
            return {...state, user: payload.user}
        },
        
        [getCurrentUser.rejected]: (state)=> {
            console.log("Rejected");
            // state.isLoading = false;
        },
    }
})

export const isLoading = (state) => state.user.isLoading;
export const getUserDetails = (state) => state.user.user;

export default userSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {  
    isAuthenticated: false,
}
const authSlice = createSlice({
    name: "check",
    initialState,
    reducers: {


    },
    extraReducers: {
        
    }
})



export default authSlice.reducer;
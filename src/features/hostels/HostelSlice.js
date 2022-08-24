import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../helpers/Api";

const initialState = {
   register = {} 
}
const hostelSlice = createSlice({
    name: "hostel",
    initialState,
    reducers: {

    },
    extraReducers: {

    }

})

export default hostelSlice.reducer;
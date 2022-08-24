import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../helpers/Api";

const roomUrl = "/dashboard/customer/rooms";
const hostelUrl = "/dashboard/customer/hostels";
const customerOwnerUrl = "/dashboard/customer/owner"



export const fetchRoomsByDetails = createAsyncThunk(
    "customer/fetchRoomsByDetails",
    async (payload) => {
        const response = await Api.post(roomUrl,payload);
        return response.data;
    }
)

export const fetchHostelsByDetails = createAsyncThunk(
    "customer/fetchHostelsByDetails",
    async (payload) => {
        const response = await Api.post(hostelUrl,payload);
        return response.data;
    }
)

export const becomeOwner = createAsyncThunk(
    "customer/becomeOwner",
    async (payload) => {
        console.log(payload);
        const response = await Api.post(customerOwnerUrl+"/become",payload);
        return response.data;
    }
)




const initialState = {
    isLoading: true,
    bookedRoomsData: [],
    bookedHostelsData: [],
    
}
const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
       
    },
    extraReducers: {
        [fetchRoomsByDetails.pending]: (state) => {
            state.isLoading = true;
            
        },
        [fetchRoomsByDetails.fulfilled]: (state, { payload }) => {
            console.log("Success");            
            return {...state, isLoading:false, bookedRoomsData:payload.data }
            
        },
        [fetchRoomsByDetails.rejected]: (state, { payload }) => {
            state.isLoading = false;
        },
        [fetchHostelsByDetails.pending]: (state) => {
            state.isLoading = true;
            
        },
        [fetchHostelsByDetails.fulfilled]: (state, { payload }) => {
            console.log("Success");            
            return {...state, isLoading:false, bookedHostelsData:payload.data }
            
        },
        [fetchHostelsByDetails.rejected]: (state, { payload }) => {
            state.isLoading = false;
        },
    }
})

export const getLoadingStatus = (state) => state.customer.isLoading;
export const getBookedHostelsData = (state) => state.customer.bookedHostelsData;
export const getBookedRoomsData = (state) => state.customer.bookedRoomsData;


export default customerSlice.reducer;
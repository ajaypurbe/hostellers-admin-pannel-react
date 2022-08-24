import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../helpers/Api";

const categoryUrl = "/category";
const typeUrl = "/hostel_type";
const roomClassUrl = "/room_class";
const pricingUrl = "/pricing";
const roomUrl = "/room";
const hostelUrl = "/hostel";
const uploadUrl = "/upload";
const bookUrl = "/book";

// Add
export const upload = createAsyncThunk(
    "general/upload",
    async (payload) => {
        const response = await Api.post(uploadUrl, payload);
        return response.data;
    }
)
export const addHostelBooking = createAsyncThunk(
    "general/addHostelBooking",
    async (payload) => {
        const response = await Api.post(bookUrl+"/hostel", payload);
        return response.data;
    }
)
export const addRoomBooking = createAsyncThunk(
    "general/addRoomBooking",
    async (payload) => {
        const response = await Api.post(bookUrl+"/room", payload);
        return response.data;
    }
)

//  Fetch

export const fetchAllCategories = createAsyncThunk(
    "general/addCategory",
    async () => {
        const response = await Api.get(categoryUrl);
        return response.data;
    }
)


export const fetchAllType = createAsyncThunk(
    "general/fetchAllType",
    async () => {
        const response = await Api.get(typeUrl);
        return response.data;
    }
)
export const fetchAllRoomClass = createAsyncThunk(
    "general/fetchAllRoomClass",
    async () => {
        const response = await Api.get(roomClassUrl);
        return response.data;
    }
)
export const fetchAllRoom = createAsyncThunk(
    "general/fetchAllRoom",
    async () => {
        const response = await Api.get(roomUrl);
        return response.data;
    }
)
export const fetchRoomByDetails = createAsyncThunk(
    "general/fetchRoomByDetails",
    async (payload) => {
        const response = await Api.post(roomUrl+"/byDetails", payload);
        return response.data;
    }
)
export const fetchHostelByDetails = createAsyncThunk(
    "general/fetchHostelByDetails",
    async (payload) => {
        const response = await Api.post(hostelUrl+"/byDetails",payload);
        return response.data;
    }
)



export const fetchAllPricings = createAsyncThunk(
    "general/fetchAllPricings",
    async () => {
        const response = await Api.get(pricingUrl);
        return response.data;
    }
)


export const fetchAllHostels = createAsyncThunk(
    "general/fetchAllHostels",
    async () => {
        const response = await Api.get(hostelUrl);
        return response.data;
    }
)



const initialState = {
    isLoading: true,
    typeStatus: null,
    typeData: [],
    allCategoriesData:[],
    allRoomClassData: [],
    allRoomData:[],
    allPricingData: [],
    allHostelsData: [],
    uploadedPath : "",
    roomDataByDetails: [],
    hostelDataByDetails:[],
    
}
const GeneralSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        
    },
    extraReducers: {

        [fetchAllType.pending]: (state) => {
            console.log("Pending");
            state.typeStatus = "loading";
            
        },
        [fetchAllType.fulfilled]: (state, { payload }) => {
            console.log("Success");
            // state.typeStatus = "success";
            return {...state, typeStatus:"success", typeData: payload.data}
            
        },
        [fetchAllType.rejected]: (state, { payload }) => {
            state.typeStatus = "failed";
            console.log("Rejected");
            // return {...state, registerData:payload}
            // state.isLoading = false;
        },
        [fetchAllCategories.pending]: (state) => {
            console.log("Pending");
            state.typeStatus = "loading";
            
        },
        [fetchAllCategories.fulfilled]: (state, { payload }) => {
            console.log("Success");
            // state.typeStatus = "success";
            return {...state, typeStatus:"success", allCategoriesData: payload.data}
            
        },
        [fetchAllCategories.rejected]: (state, { payload }) => {
            state.typeStatus = "failed";
            console.log("Rejected");
            // return {...state, registerData:payload}
            // state.isLoading = false;
        },
        [fetchAllRoomClass.pending]: (state) => {
            console.log("Pending");
            state.typeStatus = "loading";
            
        },
        [fetchAllRoomClass.fulfilled]: (state, { payload }) => {
            console.log("Success");
            return {...state, typeStatus:"success", allRoomClassData: payload.data}
            
        },
        [fetchAllRoomClass.rejected]: (state, { payload }) => {
            state.typeStatus = "failed";
            console.log("Rejected");
        },
        [fetchAllRoom.pending]: (state) => {
            console.log("Pending");
            state.typeStatus = "loading";
            
        },
        [fetchAllRoom.fulfilled]: (state, { payload }) => {
            console.log("Success");
            return {...state, typeStatus:"success", allRoomData: payload.data}
            
        },
        [fetchAllRoom.rejected]: (state, { payload }) => {
            state.typeStatus = "failed";
            console.log("Rejected");
        },
        
        [fetchAllPricings.pending]: (state) => {
            console.log("Pending");
            state.typeStatus = "loading";
            
        },
        [fetchAllPricings.fulfilled]: (state, { payload }) => {
            console.log("Success");
            return {...state, typeStatus:"success", allPricingData: payload.data}
            
        },
        [fetchAllPricings.rejected]: (state, { payload }) => {
            state.typeStatus = "failed";
            console.log("Rejected");
        },
        
        [fetchAllHostels.pending]: (state) => {
            console.log("Pending");
            state.typeStatus = "loading";
            
        },
        [fetchAllHostels.fulfilled]: (state, { payload }) => {
            console.log("Success");
            return {...state, typeStatus:"success", allHostelsData: payload.data}
            
        },
        [fetchAllHostels.rejected]: (state, { payload }) => {
            state.typeStatus = "failed";
            console.log("Rejected");
        },
    
        [upload.pending]: (state) => {
            console.log("Pending");
            state.typeStatus = "loading";
            
        },
        [upload.fulfilled]: (state, { payload }) => {
            console.log("Success");
            return {...state, typeStatus:"success", uploadedPath: payload.data}
            
        },
        [upload.rejected]: (state, { payload }) => {
            state.typeStatus = "failed";
            console.log("Rejected");
        },
    
        [fetchRoomByDetails.pending]: (state) => {
            console.log("Pending");
            state.isLoading = true;
            
        },
        [fetchRoomByDetails.fulfilled]: (state, { payload }) => {
            console.log(payload)
            console.log("Success of fetchrooms",payload.data);
            return {...state, isLoading:false, roomDataByDetails: payload.data}
            
        },
        [fetchRoomByDetails.rejected]: (state, { payload }) => {
            state.isLoading = false;
            console.log("Rejected");
        },
    
        [fetchHostelByDetails.pending]: (state) => {
            state.isLoading = true;
            console.log("Pending");
            
        },
        [fetchHostelByDetails.fulfilled]: (state, { payload }) => {
            console.log("Success");
            return {...state, isLoading:false, hostelDataByDetails: payload.data}
            
        },

        [fetchHostelByDetails.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.typeStatus = "failed";
        },
    }
})

export const getLoadingStatus = (state) => state.general.isLoading;
export const getTypeData = (state) => state.general.typeData;
export const getAllCategoriesData = (state) => state.general.allCategoriesData;
export const getAllRoomClassData = (state) => state.general.allRoomClassData;
export const getAllRoomData = (state) => state.general.allRoomData;
export const getAllRoomDataOfCurrentUser = (state) => state.general.allRoomDataOfCurrentUser;
export const getAllPricings = (state) => state.general.allPricingData;
export const getAllPricingsOfCurrentUser = (state) => state.general.allPricingDataOfCurrentUser;
export const getAllHostelsData = (state) => state.general.allHostelsData;
export const getUploadedPath = (state) => state.general.uploadedPath;
export const getRoomDataByDetails = (state) => state.general.roomDataByDetails;
export const getHostelDataByDetails = (state) => state.general.hostelDataByDetails;
export const getAllHostelsDataOfCurrentUser = (state) => state.general.allHostelsDataOfCurrentUser;


export default GeneralSlice.reducer;
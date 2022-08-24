import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../helpers/Api";

const categoryUrl = "/dashboard/admin/category";
const typeUrl = "/dashboard/admin/hostel_type";
const roomClassUrl = "/dashboard/admin/room_class";
const pricingUrl = "/dashboard/admin/pricing";
const roomUrl = "/dashboard/admin/room";
const hostelUrl = "/dashboard/admin/hostel";
const uploadUrl = "/upload"

// Add
export const upload = createAsyncThunk(
    "admin/upload",
    async (payload) => {
        const response = await Api.post(uploadUrl, payload);
        return response.data;
    }
)

export const addCategory = createAsyncThunk(
    "admin/addCategory",
    async (categoryData) => {
        const response = await Api.post(categoryUrl, categoryData);
        return response.data;
    }
)

export const updateCategory = createAsyncThunk(
    "admin/updateCategory",
    async (categoryData) => {
        const response = await Api.put(categoryUrl, categoryData);
        return response.data;
    }
)
export const deleteCategoryById = createAsyncThunk(
    "admin/deleteCategoryById",
    async (payload) => {
        console.log("Payload to delete", payload);
        const response = await Api.delete(categoryUrl, {data: payload});
        return response.data;
    }
)

export const addType = createAsyncThunk(
    "admin/addType",
    async (payload) => {
        const response = await Api.post(typeUrl, payload);
        return response.data;
    }
)
export const addRoomClass = createAsyncThunk(
    "admin/addRoomClass",
    async (payload) => {
        const response = await Api.post(roomClassUrl, payload);
        return response.data;
    }
)
export const addPricing = createAsyncThunk(
    "admin/addPricing",
    async (payload) => {
        const response = await Api.post(pricingUrl, payload);
        return response.data;
    }
)
export const addRoom = createAsyncThunk(
    "admin/addRoom",
    async (payload) => {
        const response = await Api.post(roomUrl, payload);
        return response.data;
    }
)
export const addHostel = createAsyncThunk(
    "admin/addHostel",
    async (payload) => {
        const response = await Api.post(hostelUrl, payload);
        return response.data;
    }
)

//  Fetch

export const fetchAllCategories = createAsyncThunk(
    "admin/fetchAllCategories",
    async () => {
        const response = await Api.get(categoryUrl);
        return response.data;
    }
)
export const fetchCategoriesByDetails = createAsyncThunk(
    "admin/fetchCategoriesByDetails",
    async (payload) => {
        const response = await Api.post(categoryUrl+"/byDetails", payload);
        return response.data;
    }
)


export const fetchAllType = createAsyncThunk(
    "admin/fetchAllType",
    async () => {
        const response = await Api.get(typeUrl);
        return response.data;
    }
)
export const fetchAllRoomClass = createAsyncThunk(
    "admin/fetchAllRoomClass",
    async () => {
        const response = await Api.get(roomClassUrl);
        return response.data;
    }
)
export const fetchAllRoom = createAsyncThunk(
    "admin/fetchAllRoom",
    async () => {
        const response = await Api.get(roomUrl);
        return response.data;
    }
)

export const fetchAllRoomOfCurrentUser = createAsyncThunk(
    "admin/fetchAllRoomOfCurrentUser",
    async (payload) => {
        const response = await Api.post(roomUrl+"/currentUser",payload );
        return response.data;
    }
)

export const fetchAllPricings = createAsyncThunk(
    "admin/fetchAllPricings",
    async () => {
        const response = await Api.get(pricingUrl);
        return response.data;
    }
)

export const fetchAllPricingOfCurrentUser = createAsyncThunk(
    "admin/fetchAllPricingOfCurrentUser",
    async (payload) => {
        const response = await Api.get(pricingUrl+"/currentUser",payload );
        return response.data;
    }
)

export const fetchAllHostels = createAsyncThunk(
    "admin/fetchAllHostels",
    async () => {
        const response = await Api.get(hostelUrl);
        return response.data;
    }
)

export const fetchAllHostelsOfCurrentUser = createAsyncThunk(
    "admin/fetchAllHostelsOfCurrentUser",
    async (payload) => {
        const response = await Api.get(hostelUrl, payload);
        return response.data;
    }
)

const initialState = {
    isLoading: true,
    categoryData:{},
    typeStatus: null,
    typeData: [],
    allCategoriesData:[],
    allRoomClassData: [],
    allRoomData:[],
    allRoomDataOfCurrentUser: [],
    allPricingData: [],
    allPricingDataOfCurrentUser:[],
    allHostelsData: [],
    allHostelsDataOfCurrentUser: [],
    uploadedPath : "",
    categoriesDatabyDetails:[],
    
}
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setCategoryData : (state, action) => {
            state.categoryData = action.payload;
        }
    },
    extraReducers: {
        [addCategory.pending]: (state) => {
            // state.registerData = {};
            console.log("Pending");
            // state.isLoading = true;
        },
        [addCategory.fulfilled]: (state, { payload }) => {
            console.log("Success");
            // state.isLoading = false;

        },
        [addCategory.rejected]: (state, { payload }) => {
            console.log("Rejected");
            // return {...state, registerData:payload}
            // state.isLoading = false;
        },
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
        
        [fetchAllRoomOfCurrentUser.pending]: (state) => {
            console.log("Pending");
            state.typeStatus = "loading";
            
        },
        [fetchAllRoomOfCurrentUser.fulfilled]: (state, { payload }) => {
            console.log("Success");
            return {...state, typeStatus:"success", allRoomDataOfCurrentUser: payload.data}
            
        },
        [fetchAllRoomOfCurrentUser.rejected]: (state, { payload }) => {
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
        [fetchAllPricingOfCurrentUser.pending]: (state) => {
            console.log("Pending");
            state.typeStatus = "loading";
            
        },
        [fetchAllPricingOfCurrentUser.fulfilled]: (state, { payload }) => {
            console.log("Success");
            return {...state, typeStatus:"success", allPricingDataOfCurrentUser: payload.data}
            
        },
        [fetchAllPricingOfCurrentUser.rejected]: (state, { payload }) => {
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
        [fetchAllHostelsOfCurrentUser.pending]: (state) => {
            console.log("Pending");
            state.typeStatus = "loading";
            
        },
        [fetchAllHostelsOfCurrentUser.fulfilled]: (state, { payload }) => {
            console.log("Success");
            return {...state, typeStatus:"success", allHostelsDataOfCurrentUser: payload.data}
            
        },
        [fetchAllHostelsOfCurrentUser.rejected]: (state, { payload }) => {
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
        [updateCategory.pending]: (state) => {
            state.isLoading = true;
            
        },
        [updateCategory.fulfilled]: (state, { payload }) => {
            console.log("Success");
            state.isLoading = false;
            
        },
        [updateCategory.rejected]: (state, { payload }) => {
            state.isLoading = false;
        },
        [fetchCategoriesByDetails.pending]: (state) => {
            state.isLoading = true;
            
        },
        [fetchCategoriesByDetails.fulfilled]: (state, { payload }) => {
            console.log("Success");            
            return {...state, isLoading:false, categoriesDatabyDetails:payload.data }
            
        },
        [fetchCategoriesByDetails.rejected]: (state, { payload }) => {
            state.isLoading = false;
        },
    }
})

export const getLoadingStatus = (state) => state.admin.isLoading;
export const getCategoryData = (state) => state.admin.categoryData;
export const getTypeData = (state) => state.admin.typeData;
export const getAllCategoriesData = (state) => state.admin.allCategoriesData;
export const getAllRoomClassData = (state) => state.admin.allRoomClassData;
export const getAllRoomData = (state) => state.admin.allRoomData;
export const getAllRoomDataOfCurrentUser = (state) => state.admin.allRoomDataOfCurrentUser;
export const getAllPricings = (state) => state.admin.allPricingData;
export const getAllPricingsOfCurrentUser = (state) => state.admin.allPricingDataOfCurrentUser;
export const getAllHostelsData = (state) => state.admin.allHostelsData;
export const getUploadedPath = (state) => state.admin.uploadedPath;
export const getAllHostelsDataOfCurrentUser = (state) => state.admin.allHostelsDataOfCurrentUser;
export const getCategoriesDataByDetails = (state) => state.admin.categoriesDatabyDetails;



export const {setCategoryData} = adminSlice.actions;
export default adminSlice.reducer;
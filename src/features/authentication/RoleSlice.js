import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../helpers/Api";


const getPermittedRolesUrl = "/getPermittedRoles";
export const getPermittedRoles = createAsyncThunk(
    "getPermittedRoles",
    async ()=>{
        const response = await Api.get("/user"+getPermittedRolesUrl);
        return response.data;
    }
)


const initialState = { 
    isAdmin: false,
    isUser: false,
    isOwner: false,
    allPermittedRoles: {

    }
}
const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        setIsAdminTrue : (state)=>{
            state.isUser = false;
            state.isOwner = false;
            state.isAdmin = true;
        },
        setIsUserTrue : (state)=>{
            state.isAdmin = false;
            state.isOwner = false;
            state.isUser = true;
        },
       
        setIsOwnerTrue : (state)=>{
            state.isUser = false;
            state.isAdmin = false;
            state.isOwner = true;
        },
      
        setAllFalse : (state)=>{
            state.isUser = false;
            state.isAdmin = false;
            state.isOwner = false;
        },
      

    },
    extraReducers: {
        [getPermittedRoles.pending]: (state)=> {
            console.log("Pending");
         },
         
         [getPermittedRoles.fulfilled]: (state, {payload})=> {
             console.log("this is get all permitted roles", payload.roles)
            
             return {...state, allPermittedRoles: payload.roles}
         },
         
         [getPermittedRoles.rejected]: (state)=> {
             console.log("Rejected");
             // state.isLoading = false;
         },
    }
})

export const getAllPermittedRoles = (state) => state.roles.allPermittedRoles;
export const getIsAdmin = (state) => state.roles.isAdmin;
export const getIsUser = (state) => state.roles.isUser;
export const getIsOwner = (state) => state.roles.isOwner;


export const {setIsAdminTrue, setIsOwnerTrue, setIsUserTrue, setAllFalse} = rolesSlice.actions;

export default rolesSlice.reducer;
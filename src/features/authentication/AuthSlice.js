import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../helpers/Api";

const loginUrl = "/login";
const registerUrl = "/register";
// const forgotPasswordUrl = "/forgotPassword";
const logoutUrl = "/logout";
// const verifyUrl = "/verify";
const checkUsernameUrl = "/checkUsername";
const checkEmailUrl = "/checkEmail";
const fetchNewAccessJWTUrl = "/getNewAccessToken";


export const register = createAsyncThunk(
    "auth/register",
     async (registerData)=>{
        const response = await Api.post(registerUrl, registerData);
        return response.data;
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (loginData)=>{
        const response = await Api.post(loginUrl, loginData, {withCredentials:true});
        return response.data;
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async ()=>{
        const response = await Api.get(logoutUrl, {withCredentials:true});
        return response.data;
    }
)

export const checkEmail = createAsyncThunk(
    "auth/checkEmail",
    async (checkEmailData)=>{
        const response = await Api.post(checkEmailUrl, checkEmailData);
        return response.data;
    }
)
export const checkUsername = createAsyncThunk(
    "checkUsername",
    async (checkUsernameData)=>{
        const response = await Api.post(checkUsernameUrl, checkUsernameData);
        return response.data;
    }
)
export const getNewAccessToken = createAsyncThunk(
    "getNewAccessToken",
    async ()=>{
        const response = await Api.get(fetchNewAccessJWTUrl);
        return response.data;
    }
)


const initialState = { 
    isLoading: false,
    isAuthenticated: false,
    isUsernameAvailable: {},
    isEmailAvailable: {},
    loginData : {},
    registerData : {},
    user: {}
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {


    },
    extraReducers: {
        [register.pending]: (state)=>{
            // state.registerData = {};
            console.log("Pending");
            // state.isLoading = true;
        },
        [register.fulfilled]: (state, {payload})=> {
            console.log("Success");
            // state.isLoading = false;
            
            return {...state, registerData : payload}
        },
        [register.rejected]: (state, {payload})=> {
            console.log("Rejected");
            // return {...state, registerData:payload}
            // state.isLoading = false;
        },
        [login.pending]: (state)=>{
            console.log("Pending");
            state.isLoading = true;
        },
        [login.fulfilled]: (state, {payload})=> {
            console.log("Success");
            console.log(payload);
            return {...state, isLoading:false, isAuthenticated:payload.success, loginData : payload}
        },

        [login.rejected]: (state)=> {
            console.log("Rejected");
            // state.isLoading = false;
        },

        [logout.pending]: (state)=> {
            state.isAuthenticated = false;
            // state.isLoading = false;
        },
        [logout.fulfilled]: (state)=> {
            state.isAuthenticated = false;
            // state.isLoading = false;
        },
        [logout.rejected]: (state)=> {
            state.isAuthenticated = false;
            // state.isLoading = false;
        },
        [checkUsername.fulfilled]: (state, {payload})=> {
            console.log("Success");
            return {...state, isUsernameAvailable : payload}
        },
        [checkEmail.fulfilled]: (state, {payload})=> {
            return {...state, isEmailAvailable : payload}
        },

        [getNewAccessToken.pending]: (state)=> {
           console.log("Pending");
           
        },
        [getNewAccessToken.fulfilled]: (state, {payload})=> {
            console.log("this is getnewAccesstoken Fulfilled", payload)
            return {...state, isAuthenticated : payload.success}
        },
    }
})

export const getLoginData = (state)=> state.auth.loginData;
export const getRegisterData = (state)=> state.auth.registerData;
export const getLoadingStatus = (state) => state.auth.isLoading;
export const isEmailAvailable = (state) => state.auth.isEmailAvailable;
export const isUsernameAvailable = (state) => state.auth.isUsernameAvailable;
export const isAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
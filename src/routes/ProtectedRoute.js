
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Outlet, Navigate } from "react-router-dom";
// import { getNewAccessToken } from "../features/authentication/AuthSlice";


// const ProtectedRoute = ()=> {
//     const dispatch = useDispatch();
// 	const { isAuthenticated } = useSelector(state => state.auth);
// 	const initiateDispatch = async ()=> {
// 	const result = await dispatch(getNewAccessToken());
// 	console.log(result);
// 	}
// 	initiateDispatch();
//     console.log("Chewcking protected orute loggin", isAuthenticated);
//     return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// }

// export default ProtectedRoute;


import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from "../features/authentication/AuthSlice";
// import {getUserDetails} from '../features/authentication/UserSlice';


// import AccessDenied from '../components/AccessDenied';
// import { ROLE } from '../helpers/Role';
// import { selectCurrentUser, selectIsAuthenticated } from './features/auth/authSlice'


export const ProtectedRoute = ({ component: RouteComponent, roles }) => {
	//   const user = useSelector(selectCurrentUser)
	//   const isAuthenticated = useSelector(selectIsAuthenticated)
    // const dispatch = useDispatch();
	
    const getIsAuthenticated = useSelector(isAuthenticated);
	// const user = useSelector(getUserDetails);
	// const getRoles = user?.roles;
	// console.log("Users details", getRoles);
	// console.log("Allowed roles", roles);
	
	
	// if(!getIsAuthenticated){
	// 	const result =  dispatch(getNewAccessToken())
	// 	console.log(result);
	// }


	return getIsAuthenticated? <RouteComponent/>: <Navigate to="/login"/>
	
	}
export default ProtectedRoute;
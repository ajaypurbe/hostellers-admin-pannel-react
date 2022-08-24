import React, { useState, useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import toast, { Toaster } from 'react-hot-toast';

import SubmitButton from '../../shared/button/SubmitButton';
import { login, getLoadingStatus, isAuthenticated } from '../../../features/authentication/AuthSlice';
import { setIsUserTrue } from '../../../features/authentication/RoleSlice';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const getLoadingStatusData = useSelector(getLoadingStatus);
    const getIsAuthenticated = useSelector(isAuthenticated);
    const Roles = useSelector(state=> state.roles)
    const dispatch = useDispatch();
    // dispatch(getNewAccessToken());
    console.log("this is loading status", getLoadingStatusData);
    console.log("Is Authenticated", getIsAuthenticated);


    const ref = useRef(null);

    console.log("this is autnetication on login", getIsAuthenticated);
    if(getIsAuthenticated){
       if(Roles.isAdmin){
        return <Navigate to='/admin/dashboard'></Navigate>
    }
    else if(Roles.isUser){
        return <Navigate to='/dashboard'></Navigate>
       }
    else if(Roles.isOwner){
        return <Navigate to='/owner/dashboard'></Navigate>
       }
    }

    const onUsernameChangeHandler = (e) => {
        setUsername(e.target.value);
    }
    const onPasswordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        ref.current.continuousStart();
        const payload = { "username": username, "password": password, "isEmail": false };
        const result = await dispatch(login(payload));
        if (result?.payload?.error) {
            notifyError(result.payload.error.message);
            ref.current.complete();
        }
        else if (result?.error) {
            notifyError(result.error.message);
            ref.current.complete();
        }
        else if(result?.payload && result?.payload?.success===true){
            dispatch(setIsUserTrue());
            notifySuccess(result.payload.message);
            ref.current.complete();
        }
        else if(result?.payload && result?.payload?.success===false){
            notifyError(result.payload.message);
            ref.current.complete();
        }
       
    }

    const notifySuccess = (text) => toast.success(`${text}`);
    const notifyError = (text) => toast.error(`${text}`);


    return (
        <div className='container m-auto mb-60'>
            <LoadingBar height={3} color='#461DFF' ref={ref} />
            <div className="container flex items-center justify-center pt-12 md:pt-20">

                <div className="container md:px-20 md:flex md:items-center md:justify-between">
                    <div className="px-5 md:py-12 md:pt-0">

                        <div className='h-40 bg-hostellersLight-600 z-0 mt-16 rounded-full blur-3xl bg-opacity-30'></div>

                        <div className="max-w-lg mx-auto mb-8 z-10">
                            <h2 className="text-2xl md:text-4xl  mb-4 font-bold text-center md:text-left leading-10 font-heading">
                                <span>Login to </span>
                                <br />
                                <span className="text-hostellersLight-primary">See</span> <span>Awesome</span>

                                <span> Stuff</span>

                            </h2>
                            <p className="text-sm md:text-base text-blueGray-400 text-center md:text-left font-semibold">
                                You can get complete access to view and book hostels
                            </p>
                            <p className="text-sm md:text-base text-blueGray-400 text-center md:text-left font-semibold">
                                <span className='text-hostellersLight-primary' href="">  Login now</span>
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center md:mt-10'>
                        <div className=" md:m-10 md:mt-10 flex m-auto justify-center items-center rounded-md">
                            <div>
                                <form onSubmit={onSubmitHandler}>
                                    <input onChange={onUsernameChangeHandler} type="text" required placeholder='Enter username' className="my-4 w-96 block px-3 py-3  bg-hostellersLight-100 rounded-md text-sm shadow-sm placeholder-hostellersLight-900
                                focus:outline-none focus:border-hostellersLight-500 focus:ring-1 focus:ring-hostellersLight-500
                              disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                              invalid:border-pink-500 invalid:text-pink-600
                              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
                                    <input onChange={onPasswordChangeHandler} type="password" required placeholder='Enter password' className="my-4 w-96 block px-3 py-3  bg-hostellersLight-100 rounded-md text-sm shadow-sm placeholder-hostellersLight-900
                                focus:outline-none focus:border-hostellersLight-500 focus:ring-1 focus:ring-hostellersLight-500
                              disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                              invalid:border-pink-500 invalid:text-pink-600
                              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
                                    <div className='text-center'>
                                        <SubmitButton title="Login"></SubmitButton>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className='text-center md:text-left my-4 md:my-0'>
                            <span className="text-sm md:text-base text-blueGray-400  font-medium">
                                Already have an Account?
                            </span>
                            <span className="text-sm md:text-base text-blueGray-400 font-semibold">
                                <Link className='text-hostellersLight-primary' to="/register"> Register here</Link>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

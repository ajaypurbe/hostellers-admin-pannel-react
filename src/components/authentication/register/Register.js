import React, { useState, useRef } from 'react';
import { Link, Navigate} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import toast, { Toaster } from 'react-hot-toast';

import SubmitButton from '../../shared/button/SubmitButton';
import { checkEmail, checkUsername, register, isUsernameAvailable, isEmailAvailable , isAuthenticated} from '../../../features/authentication/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function Register() {
    
    const dispatch = useDispatch();
    let isUsernameAvailableData = useSelector(isUsernameAvailable);
    let isEmailAvailableData = useSelector(isEmailAvailable);
    // let getRegisterDataSelector = useSelector(getRegisterData)
    // console.log(getRegisterDataSelector);
    const getIsAuthenticated = useSelector(isAuthenticated);
   

    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [isInitialState, setisInitialState] = useState(true)
    const [isPasswordMatched, setisPasswordMatched] = useState(false);
    const ref = useRef(null)

    if(getIsAuthenticated){
        return <Navigate to="/admin/dashboard" />
    }    

    const onUsernameChangeHandler =async (e) => {
        if (e.target.value.length > 4) {
            await dispatch(checkUsername({ username: e.target.value }))
            setRegisterData({ ...registerData, username: e.target.value })
        }
    }

    const onEmailChangeHandler = async (e) => {
        if (e.target.value.length > 4) {
            await dispatch(checkEmail({ email: e.target.value }))
            setRegisterData({ ...registerData, email: e.target.value })
        }
    }

    const onPasswordChangeHandler = (e) => {
        if (e.target.value.length > 4) {
            setRegisterData({ ...registerData, password: e.target.value })
        }
    }

    const onConfirmPasswordChangeHandler = (e) => {
        console.log(e.target.value);
        if (e.target.value.length > 4 && registerData.password===e.target.value) {
            setisInitialState(false);
            setisPasswordMatched(true);
        }
        else{
            setisInitialState(false)
            setisPasswordMatched(false);
        }
    }


    const onSubmitHandler =  async (e)=>{
        e.preventDefault();
        // getRegisterDataSelector={};
        ref.current.continuousStart();
        
        const payloadData = {
            "username": registerData.username,
            "email": registerData.email,
            "password": registerData.password,
        }
        console.log(payloadData);
        const result = await dispatch(register(payloadData));
        console.log("This is result," , result);
        if(result?.payload?.error){
            notify(result.payload.error.message);
        }
        else if(result?.payload?.success){
            toast.success(result.payload.message);
            setRegisterData({username:"", email:"", password:""})
        }
        else{
            notify(result.payload.message);
        }
        if(result){
            ref.current.complete();
            return <Navigate to="/login" />
        }
    }

    const notify = (text) => toast(`${text}`);


    return (
        <div className='container m-auto mb-60 '>
            <LoadingBar height={3} color='#461DFF' ref={ref} />

            <div className="container flex items-center justify-center pt-12 md:pt-20">

                <div className="container md:px-20 md:flex md:items-center md:justify-between">
                    <div className="px-5 md:py-12 md:pt-0">

                        <div className='h-40 bg-hostellersLight-600 z-0 mt-16 rounded-full blur-3xl bg-opacity-30'></div>

                        <div className="max-w-lg mx-auto mb-8 z-10">
                            <h2 className="text-2xl md:text-4xl  mb-4 font-bold text-center md:text-left leading-10 font-heading">
                                <span>Register to </span>
                                <br />
                                <span className="text-hostellersLight-primary">See</span> <span>Awesome</span>

                                <span> Stuff</span>

                            </h2>
                            <p className="text-sm md:text-base text-blueGray-400 text-center md:text-left font-semibold">
                                You can see, manage and book hostels
                            </p>
                            <p className="text-sm md:text-base text-blueGray-400 text-center md:text-left font-semibold">
                                <span className='text-hostellersLight-primary' href="">  Sign up now</span>
                            </p>
                        </div>

                    </div>

                    <div className='flex flex-col justify-center items-center md:mt-10'>
                        <div className=" md:m-10 md:mt-10 flex m-auto justify-center items-center rounded-md">
                            <div>
                                <form onSubmit={onSubmitHandler}>
                                    <input  onChange={onUsernameChangeHandler} required type="text" placeholder='Enter username' className={`my-4 w-96 block px-3 py-3  bg-hostellersLight-100 rounded-md text-sm shadow-sm placeholder-hostellersLight-900
                                    focus:outline-none focus:ring-1   ${isUsernameAvailableData.success === true ? "focus:ring-green-500" : "focus:ring-red-500"}
                                  disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                                  invalid:border-pink-500 invalid:text-pink-600
                                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500`} />
                                    <span className={`text-xs ${isUsernameAvailableData.success === true ? "text-green-700" : "text-red-700"}`} id="passwordHelp">{isUsernameAvailableData.message}</span>
                                    
                                    <input  onChange={onEmailChangeHandler} required type="email" placeholder='Enter email' className={`my-4 w-96 block px-3 py-3  bg-hostellersLight-100 rounded-md text-sm shadow-sm placeholder-hostellersLight-900
                                    focus:outline-none focus:ring-1   ${isEmailAvailableData.success === true ? "focus:ring-green-500" : "focus:ring-red-500"}
                                  disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                                  invalid:border-pink-500 invalid:text-pink-600
                                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500`}/>
                                    <span className={`text-xs ${isEmailAvailableData.success === true ? "text-green-700" : "text-red-700"}`} id="passwordHelp">{isEmailAvailableData.message}</span>

                                    <input onChange={onPasswordChangeHandler} required type="password" placeholder='Enter password' className="my-4 w-96 block px-3 py-3  bg-hostellersLight-100 rounded-md text-sm shadow-sm placeholder-hostellersLight-900
                                    focus:outline-none focus:border-hostellersLight-500 focus:ring-1 focus:ring-hostellersLight-500
                                  disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                                  invalid:border-pink-500 invalid:text-pink-600
                                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>

                                    <input onChange={onConfirmPasswordChangeHandler} required type="password" placeholder='Confirm password' className={`my-4 w-96 block px-3 py-3  bg-hostellersLight-100 rounded-md text-sm shadow-sm placeholder-hostellersLight-900
                                    focus:outline-none focus:ring-1   ${isPasswordMatched.success === true ? "focus:ring-green-500" : "focus:ring-red-500"}
                                  disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                                  invalid:border-pink-500 invalid:text-pink-600
                                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500`}/>
                                    {isInitialState?"":isPasswordMatched ?<span className="text-xs text-green-700">Password Matched</span>:<span className="text-xs text-red-700">Password doesn't matched</span>}
                                    <div className='text-center'>
                                        <SubmitButton disabled={isUsernameAvailableData.success ? { disabled: "" } : { disabled: "disabled" }} title="Sign up"></SubmitButton>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className='text-center md:text-left my-4 md:my-0'>
                            <span className="text-sm md:text-base text-blueGray-400  font-medium">
                                Already have an Account?
                            </span>
                            <span className="text-sm md:text-base text-blueGray-400 font-semibold">
                                <Link className='text-hostellersLight-primary' to="/login"> Login here</Link>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

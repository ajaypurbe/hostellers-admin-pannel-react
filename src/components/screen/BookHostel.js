import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLoadingStatus, addHostelBooking, fetchHostelByDetails, getHostelDataByDetails } from '../../features/general/GeneralSlice';

import { Link, Navigate, useParams } from 'react-router-dom';
import { getUserDetails, getCurrentUser } from '../../features/authentication/UserSlice';
import toast, { Toaster } from 'react-hot-toast';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";



const BookHostel = ({ match }) => {
    const { id } = useParams();

    const hostelData = useSelector(getHostelDataByDetails);
    console.log(hostelData);
    const activeUser = useSelector(getUserDetails);
    const [isbooking, setisbooking] = useState(false);
    const [paid, setpaid] = useState(false);
    const [eventData, seteventData] = useState(null);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchHostelByDetails({ _id: id }));
        dispatch(getCurrentUser());

    }, [dispatch])


    const handleFormDataChanges = (e) => {
        return new Promise((resolve, reject) => {
            const payload = {
                hostelId: hostelData[0]._id,
                roomId: hostelData[0]?.rooms[0]?._id,
                pricingId: hostelData[0]?.pricing[0]._id,
                uid: activeUser._id,
                remarks: e.target.remarks.value
            }
            resolve(payload);
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const payload = await handleFormDataChanges(e);
        const result = await dispatch(addHostelBooking(payload));
        if (result?.payload?.success) {
            // setbooked(true);
            toast.success(result?.payload.message, {duration:5000});
        }
        else if (!(result?.payload?.success)) {
            toast.error(result?.payload.message, {duration:5000});
        }
        else {
            toast("Failed to book hostel")
        }


    }

    const onSubmitValidator = (e)=>{
        e.preventDefault();
        seteventData(e);
        if(e.target.remarks.value !==""){
            setisbooking(true);
            toast.loading("Please process the payment to book the hostel", {id:"process"})
        }else{
           return toast.error("Remarks is required");
        }
    }

    return (
        <>
            {hostelData.length > 0 ? <>
                <div className='container m-auto pt-40 mb-40'>
                    <div className="mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-1 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">

                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Confirm Booking</h3>
                                    <p className="mt-1 text-sm text-gray-600">Please confirm all the details are correct</p>
                                </div>
                            </div>

                            <div className='grid grid-cols-3'>
                                <div className='col-span-1'>
                                    <h1 className='text-lg font-medium leading-6 text-gray-900'>Hostel Name</h1>
                                    <Link to={`/hostel/${hostelData[0]._id}`} className='text-hostellersLight-primary'>{hostelData[0].general.title}</Link>
                                </div>
                                <div className='col-span-1'>
                                    <h1 className='text-lg font-medium leading-6 text-gray-900'>Rent</h1>
                                    <p className='text-hostellersLight-primary'>{hostelData[0].pricing[0].title} - {hostelData[0].pricing[0].currency}{hostelData[0].pricing[0].rate}/{hostelData[0].pricing[0].duration} </p>
                                </div>
                                <div className='col-span-1'>
                                    <h1 className='text-lg font-medium leading-6 text-gray-900'>Your Email</h1>
                                    <p className='text-hostellersLight-primary'>{activeUser?.email}</p>
                                </div>
                            </div>



                            <div className="mt-5 md:mt-0 md:col-span-1">

                                <form onSubmit={onSubmitValidator}>
                                    <div className="shadow overflow-hidden sm:rounded-md">

                                        <div className="px-4 py-5 bg-white sm:p-6">

                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-6">
                                                    <label htmlFor="remarks">Remarks</label>
                                                    <textarea
                                                        type="text"
                                                        name="remarks"
                                                        id="remarks"
                                                        autoComplete="remarks"
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>


                                            </div>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                                            {paid ? <Link to="/dashboard/booked-hostels"
                                                className="py-2 px-20 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Go to Dashboard
                                            </Link> : isbooking ? (<PayPalScriptProvider options={{ "client-id": "AfaSvlfqcIZsjZrnJI8v5O2TEr7zD10THx8Sdh-lo4pZhCDfeqBHfxrzB5NkiYEUHrJbUxySuau0dboq" }}>
                                                <PayPalButtons
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [
                                                                {
                                                                    amount: {
                                                                        value: `${hostelData[0].pricing[0].rate}`,
                                                                    },
                                                                },
                                                            ],
                                                        });
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        return actions.order.capture().then((details) => {
                                                            const name = details.payer.name.given_name;
                                                            setpaid(true);
                                                            toast.success(`Payment Successful, Transaction completed by ${name}`,{duration:5000})
                                                            onSubmitHandler(eventData);
                                                            toast.dismiss("process");

                                                        });
                                                    }}
                                                />
                                            </PayPalScriptProvider>) : <button
                                                type="submit"
                                                className="py-2 px-20 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Pay
                                            </button>}

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <></>}

        </>
    )
}


export default BookHostel;

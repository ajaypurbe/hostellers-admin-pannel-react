import React, { useEffect } from 'react';
import HeroImage from '../../../assets/images/designs/herosvghostellers.png';
import HeroButton from '../../shared/button/HeroButton';
import SectionTitle from "../../shared/SectionTitle";
import { toast } from 'react-hot-toast';
import PrimaryLinkButton from '../../shared/button/PrimaryLinkButton';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllHostels, getAllHostelsData, fetchAllRoom, getAllRoomData } from '../../../features/general/GeneralSlice';
import { API_URL } from '../../../helpers/ApiUrl';
import BigTitle from '../../shared/BigTitle';
import { Link } from 'react-router-dom';
import HomepageTitle from '../../shared/HomepageTitle';


const Homepage = () => {

    const hostelsData = useSelector(getAllHostelsData);
    const roomsData = useSelector(getAllRoomData);
    console.log("hostelsData", hostelsData);
    console.log("roomsData", roomsData);

    const handleUpdateById = (id) => {
        toast.success(id);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllHostels());
        dispatch(fetchAllRoom());
    }, [dispatch])


    return (
        <div className='container m-auto '>
            <div className="container flex items-center justify-center pt-32 md:pt-40">

                <div className="container md:px-20 md:flex md:items-center md:justify-between">
                    <div className="px-5 md:py-12 md:pt-0">

                        <div className='h-40 bg-hostellersLight-600 z-0 rounded-full blur-3xl bg-opacity-30'></div>

                        <div className="max-w-lg mx-auto -mt-20 md:mt-0 mb-8 z-10">
                            <h2 className="text-3xl text-center md:text-4xl mb-6 font-bold md:text-left leading-10 font-heading">
                                <span>The</span> <span className="text-hostellersLight-primary">Hostels</span>
                                <br />
                                <div className='my-4'>
                                    <span>Like</span><span className="text-hostellersLight-primary"> Home</span>
                                </div>


                            </h2>
                            <p className="text-sm md:text-base text-blueGray-400 text-center md:text-left font-regular my-4">
                                Find hostels that feels like home
                            </p>
                            <div className='text-center md:text-left'
                            ><HeroButton title="Search here"></HeroButton></div>

                        </div>

                    </div>

                    <div className="h-1/3 ml-0 md:1/2 md:m-0 md:mt-0 flex m-auto justify-center items-center w-10/12 md:w-5/12 md:mb-20 rounded-md">
                        <div>
                            <img src={`${HeroImage}`} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Rooms */}
            {/* <BigTitle title="All Rooms"></BigTitle> */}
            <HomepageTitle title="Our Rooms" subtitle="Our all available rooms" description="You can find awesome rooms in different categories"></HomepageTitle>

            <div className="grid grid-cols-1 mx-10 sm:grid-cols-3 md:grid-cols-4 gap-10 my-20">
                {roomsData.map((item, index) => {
                    return <Link to={`/rooms/${item._id}`} className='col-span-1 cursor-pointer hover:shadow-2xl rounded-md hover:bg-hostellersLight-400 hover:bg-opacity-5 hover:-translate-y-2 transition duration-500' key={item._id}>

                        <div className="max-w-4xl mx-auto grid grid-cols-1 shadow-md p-2">
                            <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0">
                                <h1 className="mt-1 text-lg font-semibold text-white sm:text-hostellersLight-primary md:text-2xl">{item.general?.title}</h1>
                                <p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">{item.pricing?.rate} {item.pricing?.currency}</p>
                            </div>
                            <div className="grid gap-4 col-start-1 col-end-3 row-start-1 mb-6  ">
                                <img src={`${API_URL}/${item.image.profileImage}`} className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy" />
                            </div>
                            <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3">
                                <dt className="sr-only">Reviews</dt>
                                <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
                                    <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-1 stroke-current dark:stroke-indigo-500">
                                        <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{item.roomDetails?.class?.classTitle}</span>
                                </dd>
                                <dt className="sr-only">Location</dt>
                                <dd className="flex items-center">
                                    <svg width="2" height="2" aria-hidden="true" fill="currentColor" className="mx-3 text-slate-300">
                                        <circle cx="1" cy="1" r="1" />
                                    </svg>
                                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-slate-400 dark:text-slate-500" aria-hidden="true">
                                        <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
                                        <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                                    </svg>
                                    {item.address.place}, {item.address?.city}
                                </dd>
                            </dl>
                            <div className="mt-4 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2">
                                <span className='bg-hostellersLight-600 bg-opacity-10 text-hostellersLight-primary font-semibold p-2 rounded-lg'>{item.type?.typeName}</span>

                            </div>
                            <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2  dark:text-slate-400">
                                {item.general.description}
                            </p>
                        </div>
                    </Link>
                })}

            </div>


            {/* Rooms end */}

            {/* Hostels */}
            {/* <BigTitle title="Find Hostels"></BigTitle> */}
            <HomepageTitle title="Our Hostels" subtitle="Find all available hostels" description="You can find awesome hostels in different categories"></HomepageTitle>


            <div className="grid grid-cols-1 mx-10 sm:grid-cols-2 md:grid-cols-4 gap-10 my-20 ">
                {hostelsData.map((item, index) => {
                    return <Link to={`/hostel/${item._id}`} className='col-span-1 cursor-pointer hover:shadow-2xl rounded-md hover:bg-hostellersLight-400 hover:bg-opacity-5 hover:-translate-y-2 transition duration-500' key={item._id}>

                        <div className="max-w-4xl mx-auto grid grid-cols-1 shadow-md p-2">
                            <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0">
                                <h1 className="mt-1 text-lg font-semibold text-white sm:text-hostellersLight-primary md:text-2xl">{item.general.title}</h1>
                                <p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">{item.pricing.rate} {item.pricing.currency}</p>
                            </div>
                            <div className="grid gap-4 col-start-1 col-end-3 row-start-1 mb-6  ">
                                <img src={`${API_URL}/${item.image.profileImage}`} className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy" />
                            </div>
                            <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3">
                                <dt className="sr-only">Reviews</dt>
                                <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
                                    <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-1 stroke-current dark:stroke-indigo-500">
                                        <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{item.hostelDetails?.category?.categoryName}</span>
                                </dd>
                                <dt className="sr-only">Location</dt>
                                <dd className="flex items-center">
                                    <svg width="2" height="2" aria-hidden="true" fill="currentColor" className="mx-3 text-slate-300">
                                        <circle cx="1" cy="1" r="1" />
                                    </svg>
                                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-slate-400 dark:text-slate-500" aria-hidden="true">
                                        <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
                                        <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                                    </svg>
                                    {item.address.place}, {item.address.city}
                                </dd>
                            </dl>
                            <div className="mt-4 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2">
                                <span className='bg-hostellersLight-600 bg-opacity-10 text-hostellersLight-primary font-semibold p-2 rounded-lg'>{item.hostelDetails.hostelType?.typeName}</span>

                            </div>
                            <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2  dark:text-slate-400">
                                {item.general.description}
                            </p>
                        </div>
                    </Link>
                })}

            </div>


            {/* Rooms end */}

            {/* Call for become owner */}


            <div className="bg-gray-50 rounded-t-2xl shadow-sm my-20 ">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block">Ready to dive in?</span>
                        <span className="block text-indigo-600">List your property for free</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Sign Up
                            </Link>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                            >
                                Learn more
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


            {/* Call for become owner */}


        </div>
    )
}


export default Homepage;

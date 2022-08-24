import React, { useEffect, useRef } from 'react';
import SectionTitle from "../../shared/SectionTitle";
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { getLoadingStatus, getHostelDataByDetails, fetchHostelByDetails } from '../../../features/general/GeneralSlice';
import { API_URL } from '../../../helpers/ApiUrl';
import { Link, useParams } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { SRLWrapper } from "simple-react-lightbox";
import MyGoogleMapMarkerWidget from '../../dashboard/widgets/google_maps/MyGoogleMapMarkerWidget';
import { isAuthenticated } from '../../../features/authentication/AuthSlice';




const SingleHostel = ({ match }) => {
    const { id } = useParams();

    const hostelData = useSelector(getHostelDataByDetails);
    const loadingStatus = useSelector(getLoadingStatus);
    const ref = useRef(null)
    console.log("Hostel data single", hostelData);
    const isUserAuthenticated = useSelector(isAuthenticated);
 

    const handleUpdateById = (id) => {
        toast.success(id);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchHostelByDetails({ _id: id }));

    }, [dispatch, ref])

    const showLoadingBar = (ref) => {
        return ref.current.continuousStart();
    }
    const disableLoadingBar = () => {
        return ref.current.complete();
    }

    const checkRef = (ref) => {
        if (ref) {
            return
        }
        return;
    }

    const onClickHandlerEditFoodMenuTableData = (id) => {
        toast.success(id);
    }
    
    const onClickHandlerEditTableData = (id) => {
        toast.success(id);
    }

    return (
        <div className='pt-20'>
            <LoadingBar height={3} color='#461DFF' ref={ref} />
            {/* {loadingStatus === true && ref != null && hostelData.length > 0 ? showLoadingBar(ref) : <></>} */}
            {loadingStatus && ref != null && hostelData.length > 0 ? <></> : <>
                {ref ? <>

                    {/* Profile of single roon */}
                    {hostelData.length > 0 ? <>
                        <main className="profile-page">
                            <section className="relative block h-500-px">
                                <img src={`${API_URL}/${hostelData[0]?.image.coverImage}`} className={` object-cover w-full h-96`}>
                                </img>

                                <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
                                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                                    </svg>
                                </div>
                            </section>
                            <section className="relative py-16 bg-blueGray-200">
                                <div className="container mx-auto px-4">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                        <div className="px-6">
                                            <div className="flex flex-wrap justify-center">
                                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                                    <div className="relative">
                                                        <img alt="..." src={`${API_URL}/${hostelData[0]?.image.profileImage}`} className="shadow-xl rounded-full w-32 lg:w-96  align-middle border-none -mt-16 lg:-mt-32 max-w-150-px" />
                                                    </div>
                                                </div>
                                                <div className="w-full text-center lg:w-4/12 px-4 lg:order-3 lg:text-center lg:self-center">
                                                    <div className="py-6 px-3 sm:mt-0">
                                                        <div className='my-4'>
                                                            <Link  to={isUserAuthenticated?`/hostel/book/${hostelData[0]?._id}`:'/login'} type='button' className="text-center group w-full sm:w-40 relative flex float-right py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                                Book this Hostel
                                                            </Link>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                                    <div className="flex justify-center mt-16 py-4 lg:pt-4 pt-8">
                                                        <div className="mr-4 p-3 text-center">
                                                            <span className="text-lg font-bold block tracking-wide text-hostellersLight-primary">{`${hostelData[0].pricing[0].currency} ${hostelData[0].pricing[0].rate} `}</span><span className="text-sm text-blueGray-400">Per {`${hostelData[0].pricing[0].duration}`}</span>
                                                        </div>

                                                        <div className="lg:mr-4 p-3 text-center">
                                                            <span className="text-lg font-bold block  tracking-wide text-hostellersLight-primary">{`${hostelData[0].hostelDetails.category.categoryName}`}</span><span className="text-sm text-blueGray-400">Category</span>
                                                        </div>
                                                        <div className="lg:mr-4 p-3 text-center">
                                                            <span className="text-lg font-bold block  tracking-wide text-hostellersLight-primary">{`${hostelData[0].hostelDetails.hostelType.typeName}`}</span><span className="text-sm text-blueGray-400">Hostel</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center mt-12">
                                                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                                                    {hostelData[0].general.title}
                                                </h3>
                                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-hostellersLight-primary"></i>
                                                    {`${hostelData[0].address.place}, ${hostelData[0].address.city}`}
                                                </div>

                                            </div>
                                            <div className="text-center mt-12 grid grid-cols-4">

                                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-hostellersLight-primary"></i>
                                                    {`${hostelData[0].general.title}, ${hostelData[0].address.city}`}
                                                </div>
                                                <a href={`mailto:${hostelData[0].contact.contactEmail[0]}`} className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                                    <i className="fas fa-solid fa-envelope mr-2 text-lg text-hostellersLight-primary"></i>
                                                    {`${hostelData[0].contact.contactEmail[0]}`}
                                                </a>

                                                <a href={`tel:${hostelData[0].contact.phoneNumber[0]}`} className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                                    <i className="fas fa-solid fa-mobile mr-2 text-lg text-hostellersLight-primary"></i>
                                                    {`${hostelData[0].contact.phoneNumber[0]}`}
                                                </a>

                                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                                    <i className="fas fa-solid fa-phone mr-2 text-lg text-hostellersLight-primary"></i>
                                                    {`${hostelData[0].contact.tel[0]}`}
                                                </div>



                                            </div>

                                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                                <div className='grid grid-cols-2 mb-10 gap-5'>
                                                    <div className='col-span-2 lg:col-span-1 rounded border border-hostellersLight-primary'>
                                                        <SectionTitle title="Room Description"></SectionTitle>
                                                        <div className="flex flex-wrap justify-center mt-5">
                                                            <div className="w-full lg:w-9/12 px-4">
                                                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                                    {`${hostelData[0].general.description}`}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-span-2 lg:col-span-1 rounded border border-hostellersLight-primary'>
                                                        <SectionTitle title="Gallery Images"></SectionTitle>
                                                        <div className="flex flex-wrap justify-center mt-5">
                                                            <div className="w-full lg:w-9/12 px-4">
                                                                <SRLWrapper>
                                                                    <div className=' grid grid-cols-3 gap-5 m-4'>

                                                                        {hostelData[0]?.image.galleryImages.map((image, index) => {
                                                                            return <div key={index} className='col-span-1'>
                                                                                <a href={`${API_URL}/${image}`}>
                                                                                    <img width={200} srl_gallery_image="true" src={`${API_URL}/${image}`} alt="Umbrella" />
                                                                                </a>
                                                                            </div>
                                                                        })}
                                                                    </div>

                                                                </SRLWrapper>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className='col-span-2 lg:col-span-1 rounded border border-hostellersLight-primary'>
                                                        <SectionTitle title="Room Features"></SectionTitle>
                                                        <div className="flex flex-wrap justify-start text-left p-10 mt-5">
                                                            <div className="grid grid-cols-1">
                                                                {hostelData[0].hostelDetails.facilities?.map((item, index) => {
                                                                    return <div key={index}>
                                                                        <i className="fa-solid fa-arrow-right-long"></i>
                                                                        <p>{item}</p>
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-span-2 lg:col-span-1 rounded border border-hostellersLight-primary'>
                                                        <SectionTitle title="Location"></SectionTitle>
                                                        <div className="flex flex-wrap  justify-start text-left  mt-5">
                                                            <MyGoogleMapMarkerWidget height="200px" width="100%" address={`${hostelData[0].address.place}, ${hostelData[0].address.city}`} lat={hostelData[0].address.coordinates.lat} lng={hostelData[0].address.coordinates.lng}></MyGoogleMapMarkerWidget>
                                                        </div>
                                                    </div>

                                                    {/*  Food Timing */}
                                                    <div className='col-span-2 lg:col-span-1 rounded border border-hostellersLight-primary'>
                                                        <SectionTitle title="Food Schedule"></SectionTitle>
                                                        <div className="flex flex-wrap  justify-start text-left mt-5">
                                                            {/* Table */}
                                                            <table className="min-w-full divide-y divide-gray-200">
                                                                <thead className="bg-gray-50">
                                                                    <tr>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                        >
                                                                            Week Day
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                        >
                                                                            Timings
                                                                        </th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody className="bg-white divide-y divide-gray-200">
                                                                    {hostelData[0].foodSchedule.foodTiming.length > 0 ? hostelData[0].foodSchedule.foodTiming.map((timings) => (
                                                                        <tr key={timings.day}>
                                                                            <td className="px-6 py-4 text-gray-600 ">
                                                                                <p>{timings.day}</p>
                                                                            </td>
                                                                            <td className="px-6 py-4 ">
                                                                                {/* Table */}
                                                                                <table className="min-w-full divide-y divide-gray-200">
                                                                                    <thead className="bg-gray-50">
                                                                                        <tr>
                                                                                            <th
                                                                                                scope="col"
                                                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                From
                                                                                            </th>
                                                                                            <th
                                                                                                scope="col"
                                                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                To
                                                                                            </th>
                                                                                            <th
                                                                                                scope="col"
                                                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                Food Items
                                                                                            </th>
                                                                                            <th
                                                                                                scope="col"
                                                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                Images
                                                                                            </th>
                                                                                            
                                                                                            
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>

                                                                                        {timings.timing.map((item) => (
                                                                                            <tr key={item._id}>
                                                                                                {/* {console.log(item)} */}
                                                                                                <td className="px-6 py-4  text-sm text-gray-500"><p>{item.from}</p></td>
                                                                                                <td className="px-6 py-4  text-sm text-gray-500">{item.to}</td>
                                                                                                <td className="px-6 py-4 w-20  text-sm text-gray-500">{item.foods.map((food, index) => <span key={index} className='flex'>{food}</span>)}</td>
                                                                                                <td className=" text-gray-500">{item.foodImages.map((image, index) => <img key={index} src={`${API_URL}/${image}`} className='w-8 h-8 object-cover rounded-lg my-2 mx-auto'></img>)}</td>
                                                                                               
                                                                                            </tr>
                                                                                        ))}

                                                                                    </tbody>
                                                                                </table>
                                                                                {/* Table */}
                                                                            </td>

                                                                        </tr>
                                                                    )) : ""}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>


                                                    {/*  Food Timing end */}

                                                    <div className='col-span-2 lg:col-span-1 rounded border border-hostellersLight-primary'>
                                                        <SectionTitle title="Food Menu"></SectionTitle>
                                                        {/* Table */}
                                                        <table className=" divide-y divide-gray-200">
                                                            <thead className="bg-gray-50">
                                                                <tr>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                    >
                                                                        Food Name
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                    >
                                                                        Images
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                    >
                                                                        Actions
                                                                    </th>

                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {hostelData[0].foodSchedule.foodMenu?.length > 0 ? hostelData[0].foodSchedule.foodMenu.map((menu) => (
                                                                    <tr key={menu._id}>
                                                                        <td className="px-6 py-4 text-gray-600 ">
                                                                            <p>{menu.title}</p>
                                                                        </td>
                                                                        <td className=" text-gray-500">{menu.images.map((image, index) => <img key={index} src={`${API_URL}/${image}`} className='w-8 h-8 object-cover rounded-lg my-2 mx-auto'></img>)}</td>
                                                                        <td className="px-6 py-4  text-sm text-gray-500"><button className='text-indigo-600 hover:text-indigo-900 text-sm font-medium' onClick={(e) => {
                                                                            e.preventDefault();
                                                                            onClickHandlerEditFoodMenuTableData(menu._id);
                                                                        }}>Edit</button></td>

                                                                    </tr>
                                                                )) : ""}
                                                            </tbody>
                                                        </table>
                                                        {/* Table */}
                                                    </div>

                                                </div>
                                            </div>

                                            <div>
                                                {/* <PricingSingleWidget></PricingSingleWidget> */}
                                            </div>
                                            <div>
                                                <link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />

                                                <section
                                                    className=" bg-white  relative z-20 overflow-hidden ">
                                                    <div className="container">
                                                        <div className="flex flex-wrap -mx-4">
                                                            <div className="w-full px-4">
                                                                <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                                                                    <span className="font-semibold text-lg text-primary mb-2 block">
                                                                        Pricing Table
                                                                    </span>
                                                                    <h2
                                                                        className="font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-dark
                  mb-4
                  "
                                                                    >
                                                                        Our Pricing Plan
                                                                    </h2>
                                                                    <p className="text-base text-body-color">
                                                                        Get the best value with the pricing
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap justify-center -mx-4">
                                                            <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                                                                {hostelData[0].pricing.map((pricing, index) => {
                                                                    return <div key={index}
                                                                        className="bg-white rounded-xl relative z-10 overflow-hidden border border-primary border-opacity-20 shadow-pricing py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12 mb-10"
                                                                    >
                                                                        <span className="text-primary font-semibold text-lg block mb-4">
                                                                            {pricing.title}
                                                                        </span>
                                                                        <h2 className="font-bold text-dark mb-5 text-[42px]">
                                                                            {`${pricing.currency} ${pricing.rate}`}
                                                                            <span className="text-base text-body-color font-medium">
                                                                                / {pricing.duration}
                                                                            </span>
                                                                        </h2>
                                                                        <p
                                                                            className="
                  text-base text-body-color
                  pb-8
                  mb-8
                  border-b border-[#F2F2F2]
                  "
                                                                        >
                                                                            {pricing.description}
                                                                        </p>
                                                                        <div className="mb-7">
                                                                            {pricing.features.map((item, i) => {
                                                                                return <p key={i} className="text-base text-body-color leading-loose mb-1">
                                                                                    {item}
                                                                                </p>
                                                                            })}
                                                                        </div>
                                                                        <button

                                                                            onClick={() => {
                                                                                return toast.success("Selected")
                                                                            }}
                                                                            className="
                  w-full
                  block
                  text-base
                  font-semibold
                  text-primary
                  bg-transparent
                  border border-hostellersLight-900
                  rounded-md
                  text-center
                  p-4
                  hover:text-white hover:bg-hostellersLight-primary hover:border-primary
                  transition
                  "
                                                                        >
                                                                            Choose {pricing.title}
                                                                        </button>
                                                                        <div>
                                                                            <span className="absolute right-0 top-7 z-[-1]">
                                                                                <svg
                                                                                    width="77"
                                                                                    height="172"
                                                                                    viewBox="0 0 77 172"
                                                                                    fill="none"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                                                                                    <defs>
                                                                                        <linearGradient
                                                                                            id="paint0_linear"
                                                                                            x1="86"
                                                                                            y1="0"
                                                                                            x2="86"
                                                                                            y2="172"
                                                                                            gradientUnits="userSpaceOnUse"
                                                                                        >
                                                                                            <stop stopColor="#3056D3" stopOpacity="0.09" />
                                                                                            <stop
                                                                                                offset="1"
                                                                                                stopColor="#C4C4C4"
                                                                                                stopOpacity="0"
                                                                                            />
                                                                                        </linearGradient>
                                                                                    </defs>
                                                                                </svg>
                                                                            </span>
                                                                            <span className="absolute right-4 top-4 z-[-1]">
                                                                                <svg
                                                                                    width="41"
                                                                                    height="89"
                                                                                    viewBox="0 0 41 89"
                                                                                    fill="none"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <circle
                                                                                        cx="38.9138"
                                                                                        cy="87.4849"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 38.9138 87.4849)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="38.9138"
                                                                                        cy="74.9871"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 38.9138 74.9871)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="38.9138"
                                                                                        cy="62.4892"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 38.9138 62.4892)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="38.9138"
                                                                                        cy="38.3457"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 38.9138 38.3457)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="38.9138"
                                                                                        cy="13.634"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 38.9138 13.634)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="38.9138"
                                                                                        cy="50.2754"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 38.9138 50.2754)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="38.9138"
                                                                                        cy="26.1319"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 38.9138 26.1319)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="38.9138"
                                                                                        cy="1.42021"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 38.9138 1.42021)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="26.4157"
                                                                                        cy="87.4849"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 26.4157 87.4849)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="26.4157"
                                                                                        cy="74.9871"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 26.4157 74.9871)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="26.4157"
                                                                                        cy="62.4892"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 26.4157 62.4892)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="26.4157"
                                                                                        cy="38.3457"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 26.4157 38.3457)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="26.4157"
                                                                                        cy="13.634"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 26.4157 13.634)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="26.4157"
                                                                                        cy="50.2754"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 26.4157 50.2754)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="26.4157"
                                                                                        cy="26.1319"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 26.4157 26.1319)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="26.4157"
                                                                                        cy="1.4202"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 26.4157 1.4202)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="13.9177"
                                                                                        cy="87.4849"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 13.9177 87.4849)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="13.9177"
                                                                                        cy="74.9871"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 13.9177 74.9871)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="13.9177"
                                                                                        cy="62.4892"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 13.9177 62.4892)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="13.9177"
                                                                                        cy="38.3457"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 13.9177 38.3457)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="13.9177"
                                                                                        cy="13.634"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 13.9177 13.634)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="13.9177"
                                                                                        cy="50.2754"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 13.9177 50.2754)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="13.9177"
                                                                                        cy="26.1319"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 13.9177 26.1319)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="13.9177"
                                                                                        cy="1.42019"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 13.9177 1.42019)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="1.41963"
                                                                                        cy="87.4849"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 1.41963 87.4849)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="1.41963"
                                                                                        cy="74.9871"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 1.41963 74.9871)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="1.41963"
                                                                                        cy="62.4892"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 1.41963 62.4892)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="1.41963"
                                                                                        cy="38.3457"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 1.41963 38.3457)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="1.41963"
                                                                                        cy="13.634"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 1.41963 13.634)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="1.41963"
                                                                                        cy="50.2754"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 1.41963 50.2754)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="1.41963"
                                                                                        cy="26.1319"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 1.41963 26.1319)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                    <circle
                                                                                        cx="1.41963"
                                                                                        cy="1.4202"
                                                                                        r="1.42021"
                                                                                        transform="rotate(180 1.41963 1.4202)"
                                                                                        fill="#3056D3"
                                                                                    />
                                                                                </svg>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                })}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main></> : <></>}
                    {/* Profile of single room end */}


                </> : <></>}

            </>}
        </div>
    )
}


export default SingleHostel;

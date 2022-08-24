import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as generateUUID } from 'uuid';

import DashboardLayout from '../DashboardLayout';
import Divider from '../Divider';
import { toast } from "react-hot-toast";
import SectionSeperator from '../../shared/SectionSeperator';
import Chips from '../widgets/Chips';
import SubSectionSeperator from '../../shared/SubSectionSeperator';
import AlertModal from '../widgets/AlertModal';
import {
  setFoodTimingDay,
  setFaclitiesList,
  setFoodTimingFoodItem,
  setFoodTimingFoodList,
  setFoodTimingFrom,
  setFoodTimingTo,
  setFoodTimingFoodImages,
  setFoodMenu,
  setFoodMenuImages,
  setFoodMenuTitle,
  getFaclitiesList,
  getFoodTimingDay,
  getFoodTimingFoodItem,
  getFoodTimingFoodList,
  getFoodTimingFrom,
  getFoodTimingTo,
  getFoodTimings,
  getFoodTimingFoodImages,
  getFoodMenuImages,
  getFoodMenuTitle,
  getFoodMenus,
  addFoodTimingFoodItemToFoodTimingFoodList
} from "../../../features/hostels/FoodTimingSlice";
import LocationPicker from '../widgets/google_maps/LocationPicker';
import AddPricing from '../widgets/AddRoomPricingWidget';

import { getUserDetails } from '../../../features/authentication/UserSlice';



export default function OwnerAddNewHostel() {
  const foodTimingDay = useSelector(getFoodTimingDay);
  const foodTimings = useSelector(getFoodTimings);
  const foodTimingFoodList = useSelector(getFoodTimingFoodList);
  const foodTimingFoodItem = useSelector(getFoodTimingFoodItem);
  const foodTimingFrom = useSelector(getFoodTimingFrom);
  const foodTimingTo = useSelector(getFoodTimingTo);
  const foodTimingFoodImages = useSelector(getFoodTimingFoodImages);

  // Food Menu States
  const foodMenuTitle = useSelector(getFoodMenuTitle);
  const foodMenuImages = useSelector(getFoodMenuImages);
  const foodMenus = useSelector(getFoodMenus);

  // Hostels state
  const [faclitiesList, setFaclitiesList] = useState([]);
  const [currentCoordinate, setcurrentCoordinate] = useState({})
  const activeUser = useSelector(getUserDetails)
  const dispatch = useDispatch();

  const notifySuccess = (text) => toast.success(`${text}`);
  // const notifyError = (text) => toast.error(`${text}`);

  const onSubmitHandler = (e) => {
    e.preventDefault();
  }

  // useEffect(() => {
  //   dispatch(fetchAllRoomOfCurrentUser({uid:activeUser._id}));
  // }, [dispatch]);

  const onFacilitiesChipClickHandler = (index, item) => {
    setFaclitiesList(items => items.filter(i => i !== item));
  }

  const onFoodTimingFoodChipClickHandler = (index, item) => {

    dispatch(setFoodTimingFoodList(foodTimingFoodList.filter(i => i !== item)));
  }
  const onFoodImagesPreviewDeleteHandler = (item) => {
    dispatch(setFoodTimingFoodImages(foodTimingFoodImages.filter(i => i !== item)));
  }
  const onFoodMenuImagesPreviewDeleteHandler = (item) => {
    dispatch(setFoodMenuImages(foodMenuImages.filter(i => i !== item)));
  }

  const onFacilitiesChangeHandler = (e) => {
    e.preventDefault();
    let value = e.target.value;
    const singleItem = value.split(',');
    setFaclitiesList(singleItem);
  }
  const onFoodTimingFoodChangeHandler = (e) => {
    e.preventDefault();
    let value = e.target.value;
    const singleItem = value.split(',');
    dispatch(setFoodTimingFoodList(singleItem));
  }

  const onClickHandlerEditTableData = (id) => {
    return <AlertModal></AlertModal>
  }
  const onClickHandlerEditFoodMenuTableData = (id) => {
    return <AlertModal></AlertModal>
  }

  const onClickHandlerFoodTimingFoodList = () => {
    alert("onClickHandlerFoodTimingFoodList")
  }
  const onClickHandlerFoodTimingFoodImages = (e) => {
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]))
    }
    dispatch(setFoodTimingFoodImages(images));
  }

  const onClickHandlerFoodTimingDay = (e) => {
    dispatch(setFoodTimingDay(e.target.value));

  }
  const onClickHandlerFoodTimingFrom = (e) => {
    dispatch(setFoodTimingFrom(e.target.value));

  }
  const onClickHandlerFoodTimingTo = (e) => {
    dispatch(setFoodTimingTo(e.target.value));

  }
  const onClickHandlerFoodTiming = async () => {
    if (foodTimingFrom.length > 0 && foodTimingTo.length > 0 && foodTimingFoodList.length > 0 && foodTimingFoodImages.length > 0) {
      // dispatch(setFoodTimingFoodItem({
      //   _id: generateUUID(),
      //   from: await foodTimingFrom,
      //   to: await foodTimingTo,
      //   foods: await foodTimingFoodList,
      //   foodImages: await foodTimingFoodImages,
      // }));

      dispatch(addFoodTimingFoodItemToFoodTimingFoodList({
        "foodTimingDay": foodTimingDay,
        "foodItem": {
          _id: generateUUID(),
          from: await foodTimingFrom,
          to: await foodTimingTo,
          foods: await foodTimingFoodList,
          foodImages: await foodTimingFoodImages,
        },
        "foodTimingsData": foodTimings
      }
      ));

    }
    else {
      toast.error("Please add data in all field");
    }
  }
  const onClickHandlerFoodMenu = async () => {
    console.log(foodMenuTitle, foodMenuImages);
    if (foodMenuTitle?.length && foodMenuImages.length>0) {

      dispatch(setFoodMenu({
        "_id": generateUUID(),
        "foodMenuTitle": foodMenuTitle,
        "foodMenuImages": foodMenuImages,
        "oldItems": foodMenus,
      }
      ));

    }
    else {
      toast.error("Please add data in all menus field");
    }
  }

  const onFoodMenuTitleHandler = (e) => {
    dispatch(setFoodMenuTitle(e.target.value));

  }
  const onClickHandlerFoodImages = (e) => {
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]))
    }
    dispatch(setFoodMenuImages(images));
  }

  return (
    <>
      <DashboardLayout>
        <form onSubmit={onSubmitHandler}>
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-6">

              <div className="mt-5 md:mt-0 md:col-span-1">


                <div className="shadow overflow-hidden sm:rounded-md">

                  <div className="px-4 py-5 bg-white sm:p-6">

                    <SectionSeperator title="General Information" description="Enter general information of the hostels"></SectionSeperator>

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Hostel Name
                        </label>
                        <input
                          type="text"
                          name="description"
                          id="description"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          Tagline
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <SectionSeperator title="Images" description="Add images that will show in Profile, cover and gallery"></SectionSeperator>
                    <div className='grid grid-cols-6 gap-6'>
                      {/* Photo */}
                      <div className='col-span-2'>
                        <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <div className="mt-1 mx-8 my-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-4'>
                        <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                        <div className="mt-1 mx-8 my-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload-cover"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input id="file-upload-cover" name="file-upload-cover" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-2'>
                        <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
                        <div className="mt-1 mx-8 my-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload-gallery"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input id="file-upload-gallery" name="file-upload-gallery" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-4'></div>
                      {/* Photo end */}

                    </div>
                    <SectionSeperator title="Contact Details" description="Enter your contact details where guests can contact"></SectionSeperator>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      {/* <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Nepal</option>

                        </select>
                      </div> */}

                      <div className="col-span-3">
                        <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="number"
                          name="phone-number"
                          id="phone-number"
                          autoComplete="phone-number"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                        <label htmlFor="tel-number" className="block text-sm font-medium text-gray-700">
                          Tel Number
                        </label>
                        <input
                          type="number"
                          name="tel-number"
                          id="tel-number"
                          autoComplete="tel-number"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                    </div>
                    <SectionSeperator title="Hostel Details" description="Enter hostel details"></SectionSeperator>
                    <div className='grid grid-cols-6 gap-6'>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="hostel-category" className="block text-sm font-medium text-gray-700">
                          Hostel Category
                        </label>
                        <select
                          id="hostel-category"
                          name="hostel-category"
                          autoComplete="hostel-category"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Boys</option>
                          <option>Girls</option>
                          <option>Need to implement</option>

                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="hostel-type" className="block text-sm font-medium text-gray-700">
                          Hostel Type
                        </label>
                        <select
                          id="hostel-type"
                          name="hostel-type"
                          autoComplete="hostel-type"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Premium</option>
                          <option>Need to implement</option>

                        </select>
                      </div>

                      <div className="col-span-3">
                        <label htmlFor="hostel-capacity" className="block text-sm font-medium text-gray-700">
                          Hostel Capacity
                        </label>
                        <input
                          type="number"
                          name="hostel-capacity"
                          id="hostel-capacity"
                          autoComplete="hostel-capacity"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-3">
                        <label htmlFor="bed-capacity-per-room" className="block text-sm font-medium text-gray-700">
                          Bed Capacity per room
                        </label>
                        <input
                          type="number"
                          name="bed-capacity-per-room"
                          id="bed-capacity-per-room"
                          autoComplete="bed-capacity-per-room"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="hostel-area" className="block text-sm font-medium text-gray-700">
                          Hostel Area
                        </label>
                        <input
                          type="number"
                          name="hostel-area"
                          id="hostel-area"
                          autoComplete="hostel-area"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="minimum-room-size" className="block text-sm font-medium text-gray-700">
                          Minimum Room Size
                        </label>
                        <input
                          type="number"
                          name="minimum-room-size"
                          id="minimum-room-size"
                          autoComplete="minimum-room-size"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="maximum-room-size" className="block text-sm font-medium text-gray-700">
                          Maximum Room Size
                        </label>
                        <input
                          type="number"
                          name="maximum-room-size"
                          id="maximum-room-size"
                          autoComplete="maximum-room-size"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="hostel-facilities" className="block text-sm font-medium text-gray-700">
                          Facilities
                        </label>
                        <input
                          type="text"
                          name="hostel-facilities"
                          id="hostel-facilities"
                          autoComplete="hostel-facilities"
                          onChange={onFacilitiesChangeHandler}
                          value={faclitiesList}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className='flex flex-wrap space-x-3 my-5 w-10/12 '> {faclitiesList.map((item, index) => {
                      return index >= 0 && item !== "" ? <Chips title={item} onClick={(e) => {
                        e.preventDefault();
                        onFacilitiesChipClickHandler(index, item);
                      }}></Chips> : ""
                    })}</div>

                    <SectionSeperator title="Food Schedule" description="Guests can know about the foods timing and menu that you provides"></SectionSeperator>
                    <SubSectionSeperator title="Food Timing" description="Provide details about at what time you provide foods to your guests"></SubSectionSeperator>
                    <div className='grid grid-cols-6 gap-6'>

                      <div className='col-span-2' >
                        <div className='my-2'>
                          <label htmlFor="food-timing-day" className="block text-sm font-medium text-gray-700">
                            Day
                          </label>
                          <select
                            onChange={onClickHandlerFoodTimingDay}
                            id="food-timing-day"
                            name="food-timing-day"
                            autoComplete="food-timing-day"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>Sunday</option>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>

                          </select>
                        </div>
                        <div className='my-2'>
                          <label htmlFor="food-timing-from" className="block text-sm font-medium text-gray-700">
                            From
                          </label>
                          <input
                            onChange={onClickHandlerFoodTimingFrom}
                            type="time"
                            name="food-timing-from"
                            id="food-timing-from"
                            autoComplete="time"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className='my-2' >
                          <label htmlFor="food-timing-to" className="block text-sm font-medium text-gray-700">
                            To
                          </label>

                          <input
                            onChange={onClickHandlerFoodTimingTo}
                            type="time"
                            name="food-timing-to"
                            id="food-timing-to"
                            autoComplete="time"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className='my-2' >
                          <label htmlFor="food-timing-foods" className="block text-sm font-medium text-gray-700">
                            Foods
                          </label>
                          <p className=" text-xs italic">You can add multiple food by seperating with comma</p>

                          <input
                            onChange={onFoodTimingFoodChangeHandler}
                            value={foodTimingFoodList}
                            type="text"
                            name="food-timing-foods"
                            id="food-timing-foods"
                            autoComplete="time"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className='flex flex-wrap space-x-3 my-5 w-10/12 '> {foodTimingFoodList.map((item, index) => {
                          return index >= 0 && item !== "" ? <Chips title={item} onClick={(e) => {
                            e.preventDefault();
                            onFoodTimingFoodChipClickHandler(index, item);
                          }}></Chips> : ""
                        })}</div>
                        {/* images */}
                        <div className='col-span-2'>
                          <label className="block text-sm font-medium text-gray-700">Food Images</label>
                          <div className="mt-1 mx-8 my-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="food-timing-image-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <span>Upload images</span>
                                  <input multiple onChange={onClickHandlerFoodTimingFoodImages} id="food-timing-image-upload" name="food-timing-image-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                              <p className="text-xs text-gray-500">You can add multiple and click on preview to delete selected image</p>
                            </div>
                          </div>
                        </div>
                        <div className='grid grid-cols-6'>
                          {foodTimingFoodImages.map((singleImage) => {
                            return <div onClick={() => {
                              onFoodImagesPreviewDeleteHandler(singleImage)
                            }} className='col-span-2 p-1 cursor-pointer  rounded-lg hover:bg-red-600'>
                              <img src={singleImage} alt="" />
                            </div>
                          })}
                        </div>
                        <div className='my-4'>
                          <button onClick={onClickHandlerFoodTiming} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add
                          </button>
                        </div>

                      </div>

                      <div className='col-span-4'>
                        <div className="flex flex-col">
                          <div className="-my-2 overflow-y-auto h-[46rem] sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                                    {foodTimings.length > 0 ? foodTimings.map((timings) => (
                                      <tr key={timings.day}>
                                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                          <p>{timings.day}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
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
                                                <th
                                                  scope="col"
                                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                  Actions
                                                </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                  <span className="sr-only">Edit</span>
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>

                                              {timings.items.map((item) => (
                                                <tr key={item._id}>
                                                  {/* {console.log(item)} */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><p>{item.from}</p></td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.to}</td>
                                                  <td className="px-6 py-4 w-20  text-sm text-gray-500">{item.foods.map((food, index) => <span key={index} className='flex'>{food}</span>)}</td>
                                                  <td className=" text-gray-500">{item.foodImages.map((image, index) => <img key={index} src={image} className='w-8 h-8 object-cover rounded-lg my-2 mx-auto'></img>)}</td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button className='text-indigo-600 hover:text-indigo-900 text-sm font-medium' onClick={(e) => {
                                                    e.preventDefault();
                                                    onClickHandlerEditTableData(item._id);
                                                  }}>Edit</button></td>
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
                          </div>
                        </div>
                      </div>
                    </div>

                    <SubSectionSeperator title="Food Menus" description="Enter your food menus details"></SubSectionSeperator>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-2' >

                        <div className='my-2' >
                          <label htmlFor="food-timing-foods" className="block text-sm font-medium text-gray-700">
                            Food Name
                          </label>
                          <p className=" text-xs italic">Give the name of your food</p>

                          <input
                            onChange={onFoodMenuTitleHandler}
                            type="text"
                            name="food-timing-foods"
                            id="food-timing-foods"
                            autoComplete="time"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        {/* images */}
                        <div className='col-span-2'>
                          <label className="block text-sm font-medium text-gray-700">Food Images</label>
                          <p className=" text-xs italic">Provide images of this food</p>
                          <div className="mt-1 mx-8 my-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="food-menu-image-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <span>Upload images</span>
                                  <input multiple onChange={onClickHandlerFoodImages} id="food-menu-image-upload" name="food-menu-image-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                              <p className="text-xs text-gray-500">You can add multiple and click on preview to delete selected image</p>
                            </div>
                          </div>
                        </div>
                        <div className='grid grid-cols-6'>
                          {foodMenuImages.map((singleImage) => {
                            return <div onClick={() => {
                              onFoodMenuImagesPreviewDeleteHandler(singleImage)
                            }} className='col-span-2 p-1 cursor-pointer  rounded-lg hover:bg-red-600'>
                              <img src={singleImage} alt="" />
                            </div>
                          })}
                        </div>
                        <div className='my-4'>
                          <button onClick={onClickHandlerFoodMenu} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add
                          </button>
                        </div>

                      </div>

                      <div className='col-span-4'>
                        <div className="flex flex-col">
                          <div className="-my-2 overflow-y-auto h-[34rem] sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                {/* Table */}
                                <table className="min-w-full divide-y divide-gray-200">
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
                                    {foodMenus?.length > 0 ? foodMenus.map((menu) => (
                                      <tr key={menu._id}>
                                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                          <p>{menu.title}</p>
                                        </td>
                                        <td className=" text-gray-500">{menu.images.map((image, index) => <img key={index} src={image} className='w-8 h-8 object-cover rounded-lg my-2 mx-auto'></img>)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button className='text-indigo-600 hover:text-indigo-900 text-sm font-medium' onClick={(e) => {
                                          e.preventDefault();
                                          onClickHandlerEditFoodMenuTableData(menu._id);
                                        }}>Edit</button></td>

                                      </tr>
                                    )) : ""}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                    <SectionSeperator title="Address" description="Enter correct address where your guest can visit and contact"></SectionSeperator>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700">
                          Location Coordinates
                        </label>
                        <p className=" text-xs italic">Enter comma seperated value (Latitude, Longitude)</p>

                        <input
                          type="text"
                          value={`${currentCoordinate.lat}, ${currentCoordinate.lng}`}
                          name="coordinates"
                          id="coordinates"
                          autoComplete="coordinates"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />

                      </div>
                      <div className='col-span-6 sm:col-span-6'>
                        <LocationPicker currentCoordinateHandler = {setcurrentCoordinate}></LocationPicker>
                        {/* {console.log("Current coordinates", currentCoordinate)}; */}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Nepal</option>

                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>


                      <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                          Street address
                        </label>
                        <p className=" text-xs italic">Eg. Street 12, Bhupi Sherchan marg, Near Apex College</p>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="place" className="block text-sm font-medium text-gray-700">
                          Place
                        </label>
                        <p className=" text-xs italic">Enter name of place (Baneshwor, Koteshwor)</p>
                        <input
                          type="text"
                          name="place"
                          id="place"
                          autoComplete="place"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        
                      </div>

                      
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                          State / Province
                        </label>
                        <p className=" text-xs italic">Eg. Bagmati</p>
                        <input
                          type="text"
                          name="province"
                          id="province"
                          autoComplete="province"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                          ZIP / Postal code
                        </label>
                        <p className=" text-xs italic">Eg. 44600</p>
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <AddPricing></AddPricing>
                 
                    <SectionSeperator title="General Information" description="Enter general information of the hostels"></SectionSeperator>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Nepal</option>

                        </select>
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                          Street address
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                          State / Province
                        </label>
                        <input
                          type="text"
                          name="region"
                          id="region"
                          autoComplete="address-level1"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                          ZIP / Postal code
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>


                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </form>
        <Divider></Divider>
        <button onClick={() => notifySuccess("This is success")}>Click me</button>
      </DashboardLayout>
    </>
  )
}


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
  getStringFoodTimings,
  addFoodTimingFoodItemToFoodTimingFoodList
} from "../../../features/hostels/FoodTimingSlice";
import LocationPicker from '../widgets/google_maps/LocationPicker';
import AddPricing from '../widgets/AddHostelPricingWidget';

import { getUserDetails } from '../../../features/authentication/UserSlice';
import { API_URL } from '../../../helpers/ApiUrl';
import { addHostel, fetchAllRoomOfCurrentUser, getAllRoomDataOfCurrentUser, fetchAllCategories, fetchAllRoomClass, fetchAllType, getAllCategoriesData, getAllRoomClassData, getTypeData, fetchAllHostelsOfCurrentUser, getAllHostelsDataOfCurrentUser, upload, getUploadedPath } from "../../../features/dashboard/AdminSlice";

import { getMultiplePricingIds } from '../../../features/hostels/hostelPricingSlice';
import SectionTitle from '../../shared/SectionTitle';


export default function AdminAddNewHostel() {
  const foodTimingDay = useSelector(getFoodTimingDay);
  const foodTimings = useSelector(getFoodTimings);
  const stringFoodTimings = useSelector(getStringFoodTimings);
  const foodTimingFoodList = useSelector(getFoodTimingFoodList);
  const foodTimingFoodItem = useSelector(getFoodTimingFoodItem);
  const foodTimingFrom = useSelector(getFoodTimingFrom);
  const foodTimingTo = useSelector(getFoodTimingTo);
  const foodTimingFoodImages = useSelector(getFoodTimingFoodImages);

  const allCategoriesData = useSelector(getAllCategoriesData);
  const allTypeData = useSelector(getTypeData);
  // Food Menu States
  const foodMenuTitle = useSelector(getFoodMenuTitle);
  const foodMenuImages = useSelector(getFoodMenuImages);
  const foodMenus = useSelector(getFoodMenus);

  // Hostels state
  const [faclitiesList, setFaclitiesList] = useState([]);
  const [currentCoordinate, setcurrentCoordinate] = useState({})
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [galleryImages, setgalleryImages] = useState([]);
  const [profileImageD, setprofileImage] = useState("");
  const [coverImageD, setcoverImage] = useState("");

  const allRoomsOfCurrentUser = useSelector(getAllRoomDataOfCurrentUser);
  const activeUser = useSelector(getUserDetails)
  const pricingIds = useSelector(getMultiplePricingIds);

  console.log("allRoomsOfCurrentUser", allRoomsOfCurrentUser);

  const dispatch = useDispatch();

  const notifySuccess = (text) => toast.success(`${text}`);

  useEffect(() => {
    dispatch(fetchAllRoomClass());
    dispatch(fetchAllCategories());
    dispatch(fetchAllType());
    dispatch(fetchAllHostelsOfCurrentUser());
    dispatch(fetchAllRoomOfCurrentUser({ "uid": activeUser._id }));

  }, [dispatch, activeUser._id])

  const handleUpdateById = (id) => {
    toast.success(id);
  }


  const handleFormDataChanges = (e) => {
    return new Promise((resolve, reject) => {
      const payload = {
        uid: activeUser._id,
        title: e.target.title.value,
        tagline: e.target.tagline.value,
        description: e.target.description.value,
        contactEmail: [e.target.contactEmail.value],
        phoneNumber: [e.target.phoneNumber.value],
        tel: [e.target.tel.value],
        hostelTypeId: e.target.hostelType.value,
        studentCapacity: e.target.hostelCapacity.value,
        bedCapacityPerRoom: e.target.hostelArea.value,
        categoryId: e.target.hostelCategory.value,
        hostelArea: e.target.hostelArea.value,
        maxRoomSize: e.target.maxRoomSize.value,
        minRoomSize: e.target.minRoomSize.value,
        facilities: faclitiesList,
        foodTiming: foodTimings,
        foodMenu: foodMenus,
        lat: currentCoordinate.lat,
        lng: currentCoordinate.lng,
        city: e.target.city.value,
        province: e.target.province.value,
        zip: e.target.postalCode.value,
        place: e.target.place.value,
        street: e.target.streetAddress.value,
        roomIds: selectedRoom,
        pricingIds: pricingIds,
        profileImage: profileImageD,
        coverImage: coverImageD,
        galleryImages: galleryImages,
      }
      resolve(payload)

    })
  }



  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const payload = await handleFormDataChanges(e);
    const result = await dispatch(addHostel(payload));
    if (result?.payload?.success) {
      toast.success(result.payload.message);
    }
    else if (!(result?.payload?.success)) {
      toast.error(result?.payload?.message);
    }

  }


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

  const uploadFormHandler = (data) => {
    return new Promise((resolve, reject) => {

      const formData = new FormData();
      formData.append('file', data);

      resolve(formData);

    })
  }

  const onClickHandlerFoodTimingFoodImages = async (e) => {
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {

      const payload = await uploadFormHandler(e.target.files[i])
      const result = await dispatch(upload(payload));
      images.push(result.payload.path);
      // images.push(URL.createObjectURL(e.target.files[i]))
    }
    console.log(images, "images pushed");
    dispatch(setFoodTimingFoodImages(images));
  }



  const onClickHandlerGalleryImages = async (e) => {
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {

      const payload = await uploadFormHandler(e.target.files[i])
      const result = await dispatch(upload(payload));
      images.push(result.payload.path);
      // images.push(URL.createObjectURL(e.target.files[i]))
    }
    console.log(images, "images pushed");
    setgalleryImages(images);
  }

  const onClickHandlerProfileImages = async (e) => {
    const payload = await uploadFormHandler(e.target.files[0])
    const result = await dispatch(upload(payload));
    setprofileImage(result.payload.path);
  }

  const onClickHandlerCoverImages = async (e) => {
    const payload = await uploadFormHandler(e.target.files[0])
    const result = await dispatch(upload(payload));
    setcoverImage(result.payload.path);
  }


  const onClickHandlerFoodImages = async (e) => {
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const payload = await uploadFormHandler(e.target.files[i])
      const result = await dispatch(upload(payload));
      images.push(result.payload.path);
    }
    dispatch(setFoodMenuImages(images));
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

  const onSelectRoomHandler = (id, title) => {
    if (!(selectedRoom.includes(id))) {
      toast.success(title + " Selected")
      setSelectedRoom([...selectedRoom, id]);
    }
    else {
      setSelectedRoom(items => items.filter(i => i !== id));
      toast.success(title + " De Selected")
    }

  }


  const onClickHandlerFoodTiming = async () => {
    if (foodTimingFrom.length > 0 && foodTimingTo.length > 0 && foodTimingFoodList.length > 0 && foodTimingFoodImages.length > 0) {

      dispatch(addFoodTimingFoodItemToFoodTimingFoodList({
        "foodTimingDay": foodTimingDay,
        "foodItem": {
          _tid: generateUUID(),
          from: await foodTimingFrom,
          to: await foodTimingTo,
          foods: await foodTimingFoodList,
          foodImages: await foodTimingFoodImages,
        },
        "foodTimingsData": foodTimings,
        "stringFoodTimingData": stringFoodTimings
      }
      ));

    }
    else {
      toast.error("Please add data in all field");
    }
  }
  const onClickHandlerFoodMenu = async () => {
    console.log(foodMenuTitle, foodMenuImages);
    if (foodMenuTitle?.length && foodMenuImages.length > 0) {

      dispatch(setFoodMenu({
        "_tid": generateUUID(),
        "foodMenuTitle": foodMenuTitle,
        "foodMenuImages": foodMenuImages,
        "oldtiming": foodMenus,
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

  return (
    <>
      <DashboardLayout>
        <form onSubmit={onSubmitHandler}>
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-6">

              <div className="mt-5 md:mt-0 md:col-span-1 ">

                <SectionTitle title="Adds Hostel"></SectionTitle>

                <div className="shadow overflow-hidden sm:rounded-md">

                  <div className="px-4 py-5 bg-white sm:p-6">

                    <SectionSeperator title="General Information" description="Enter general information of the hostels"></SectionSeperator>

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Hostel Name
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">
                          Tagline
                        </label>
                        <input
                          type="text"
                          name="tagline"
                          id="tagline"
                          autoComplete="tagline"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          type="text"
                          name="description"
                          id="description"
                          autoComplete="description"
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
                                htmlFor="profileImage"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input onChange={onClickHandlerProfileImages} id="profileImage" name="profileImage" type="file" className="sr-only" />
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
                                htmlFor="coverImage"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input onChange={onClickHandlerCoverImages} id="coverImage" name="coverImage" type="file" className="sr-only" />
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
                                htmlFor="galleryImages"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input onChange={onClickHandlerGalleryImages} id="galleryImages" name="galleryImages" type="file" className="sr-only" multiple />
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
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          type="text"
                          name="contactEmail"
                          id="contactEmail"
                          autoComplete="contactEmail"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>


                      <div className="col-span-3">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="number"
                          name="phoneNumber"
                          id="phoneNumber"
                          autoComplete="phoneNumber"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                        <label htmlFor="tel" className="block text-sm font-medium text-gray-700">
                          Tel Number
                        </label>
                        <input
                          type="number"
                          name="tel"
                          id="tel"
                          autoComplete="tel"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                    </div>
                    <SectionSeperator title="Hostel Details" description="Enter hostel details"></SectionSeperator>
                    <div className='grid grid-cols-6 gap-6'>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="hostelCategory" className="block text-sm font-medium text-gray-700">
                          Hostel Category
                        </label>
                        <select
                          id="hostelCategory"
                          name="hostelCategory"
                          autoComplete="hostelCategory"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {allCategoriesData.map((item, index) => {
                            return <option key={item._id} value={item._id}>{item.categoryName}</option>

                          })}


                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="hostelType" className="block text-sm font-medium text-gray-700">
                          Hostel Type
                        </label>
                        <select
                          id="hostelType"
                          name="hostelType"
                          autoComplete="hostelType"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {allTypeData.map((item, index) => {
                            return <option key={item._id} value={item._id} >{item.typeName}</option>
                          })}

                        </select>
                      </div>

                      <div className="col-span-3">
                        <label htmlFor="hostelCapacity" className="block text-sm font-medium text-gray-700">
                          Hostel Capacity
                        </label>
                        <input
                          type="number"
                          name="hostelCapacity"
                          id="hostelCapacity"
                          autoComplete="hostelCapacity"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-3">
                        <label htmlFor="bedCapacityPerRoom" className="block text-sm font-medium text-gray-700">
                          Bed Capacity per room
                        </label>
                        <input
                          type="number"
                          name="bedCapacityPerRoom"
                          id="bedCapacityPerRoom"
                          autoComplete="bedCapacityPerRoom"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="hostelArea" className="block text-sm font-medium text-gray-700">
                          Hostel Area
                        </label>
                        <input
                          type="number"
                          name="hostelArea"
                          id="hostelArea"
                          autoComplete="hostelArea"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="minRoomSize" className="block text-sm font-medium text-gray-700">
                          Minimum Room Size
                        </label>
                        <input
                          type="number"
                          name="minRoomSize"
                          id="minRoomSize"
                          autoComplete="minRoomSize"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="maxRoomSize" className="block text-sm font-medium text-gray-700">
                          Maximum Room Size
                        </label>
                        <input
                          type="number"
                          name="maxRoomSize"
                          id="maxRoomSize"
                          autoComplete="maxRoomSize"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="facilities" className="block text-sm font-medium text-gray-700">
                          Facilities
                        </label>
                        <input
                          type="text"
                          name="facilities"
                          id="facilities"
                          autoComplete="facilities"
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
                          <label htmlFor="foodTimingDay" className="block text-sm font-medium text-gray-700">
                            Day
                          </label>
                          <select
                            onChange={onClickHandlerFoodTimingDay}
                            id="foodTimingDay"
                            name="foodTimingDay"
                            autoComplete="foodTimingDay"
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
                          <label htmlFor="foodTimingFrom" className="block text-sm font-medium text-gray-700">
                            From
                          </label>
                          <input
                            onChange={onClickHandlerFoodTimingFrom}
                            type="time"
                            name="foodTimingFrom"
                            id="foodTimingFrom"
                            autoComplete="foodTimingFrom"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className='my-2' >
                          <label htmlFor="foodTimingTo" className="block text-sm font-medium text-gray-700">
                            To
                          </label>

                          <input
                            onChange={onClickHandlerFoodTimingTo}
                            type="time"
                            name="foodTimingTo"
                            id="foodTimingTo"
                            autoComplete="foodTimingTo"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className='my-2' >
                          <label htmlFor="foodTimingFoods" className="block text-sm font-medium text-gray-700">
                            Foods
                          </label>
                          <p className=" text-xs italic">You can add multiple food by seperating with comma</p>

                          <input
                            onChange={onFoodTimingFoodChangeHandler}
                            value={foodTimingFoodList}
                            type="text"
                            name="foodTimingFoods"
                            id="foodTimingFoods"
                            autoComplete="foodTimingFoods"
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
                                  htmlFor="foodTimingImages"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <span>Upload images</span>
                                  <input multiple onChange={onClickHandlerFoodTimingFoodImages} id="foodTimingImages" name="foodTimingImages" type="file" className="sr-only" />
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
                              <img src={`${API_URL}/${singleImage}`} alt="" />
                            </div>
                          })}
                        </div>
                        <div className='my-4'>
                          <button type='button' onClick={onClickHandlerFoodTiming} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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

                                              {timings.timing.map((item) => (
                                                <tr key={item._tid}>
                                                  {/* {console.log(item)} */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><p>{item.from}</p></td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.to}</td>
                                                  <td className="px-6 py-4 w-20  text-sm text-gray-500">{item.foods.map((food, index) => <span key={index} className='flex'>{food}</span>)}</td>
                                                  <td className=" text-gray-500">{item.foodImages.map((image, index) => <img key={index} src={`${API_URL}/${image} `} className='w-8 h-8 object-cover rounded-lg my-2 mx-auto'></img>)}</td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button type='button' className='text-indigo-600 hover:text-indigo-900 text-sm font-medium' onClick={(e) => {
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
                          <label htmlFor="foodTimingFoods" className="block text-sm font-medium text-gray-700">
                            Food Name
                          </label>
                          <p className=" text-xs italic">Give the name of your food</p>

                          <input
                            onChange={onFoodMenuTitleHandler}
                            type="text"
                            name="foodTimingFoods"
                            id="foodTimingFoods"
                            autoComplete="foodTimingFoods"
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
                                  htmlFor="foodMenuImages"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <span>Upload images</span>
                                  <input multiple onChange={onClickHandlerFoodImages} id="foodMenuImages" name="foodMenuImages" type="file" className="sr-only" />
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
                              <img src={`${API_URL}/${singleImage}`} alt="" />
                            </div>
                          })}
                        </div>
                        <div className='my-4'>
                          <button type='button' onClick={onClickHandlerFoodMenu} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
                                      <tr key={menu._tid}>
                                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                          <p>{menu.title}</p>
                                        </td>
                                        {console.log(menu)}
                                        <td className=" text-gray-500">{menu.images.map((image, index) => <img key={index} src={`${API_URL}/${image}`} className='w-8 h-8 object-cover rounded-lg my-2 mx-auto'></img>)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button type='button' className='text-indigo-600 hover:text-indigo-900 text-sm font-medium' onClick={(e) => {
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
                        <LocationPicker currentCoordinateHandler={setcurrentCoordinate}></LocationPicker>
                        {/* {console.log("Current coordinates", currentCoordinate)}; */}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country"
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
                        <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                          Street address
                        </label>
                        <p className=" text-xs italic">Eg. Street 12, Bhupi Sherchan marg, Near Apex College</p>
                        <input
                          type="text"
                          name="streetAddress"
                          id="streetAddress"
                          autoComplete="streetAddress"
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
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                          ZIP / Postal code
                        </label>
                        <p className=" text-xs italic">Eg. 44600</p>
                        <input
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          autoComplete="postalCode"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <AddPricing></AddPricing>

                    <SectionSeperator title="Room Information" description="Select rooms that belongs to this hostel"></SectionSeperator>
                    {/* Rooms */}

                    {allRoomsOfCurrentUser.map((item, index) => {
                      return <>
                        <div className="py-6 px-4 sm:p-6 ">
                          <div className="max-w-4xl mx-auto grid grid-cols-1">
                            <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0">
                              <h1 className="mt-1 text-lg font-semibold text-white sm:text-hostellersLight-primary md:text-2xl">{item.general.title}</h1>
                              <p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">{item.pricing.rate} {item.pricing.currency}</p>
                            </div>
                            <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 ">
                              <img src={`${API_URL}/${item.image.profileImage}`} className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy" />
                              <img src={`${API_URL}/${item.image.coverImage}`} alt="" className="hidden w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy" />
                              <img src={`${API_URL}/${item.image.coverImage}`} alt="" className="hidden w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy" />
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
                                {item.address.place}, {item.address.city}
                              </dd>
                            </dl>
                            <div className="mt-4 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2">
                              <button type="button" onClick={() => {
                                onSelectRoomHandler(item._id, item.general.title);
                              }} className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">Select</button>

                            </div>
                            <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2  dark:text-slate-400">
                              {item.general.description}
                            </p>
                          </div>
                        </div>
                        <Divider></Divider>
                      </>
                    })}
                    {/* Rooms end */}


                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save New Hostel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </form>

      </DashboardLayout>
    </>
  )
}


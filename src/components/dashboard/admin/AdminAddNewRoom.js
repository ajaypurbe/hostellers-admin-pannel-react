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

import {addRoom,upload, fetchAllCategories, fetchAllRoomClass, fetchAllType, getAllCategoriesData, getAllRoomClassData, getTypeData, fetchAllHostelsOfCurrentUser, getAllHostelsDataOfCurrentUser} from "../../../features/dashboard/AdminSlice";

import LocationPicker from '../widgets/google_maps/LocationPicker';
import AddPricing from '../widgets/AddRoomPricingWidget';
import { getUserDetails } from '../../../features/authentication/UserSlice';
import { getsinglePricingId } from '../../../features/rooms/roomPricingSlice';

export default function AdminAddNewRoom() {
 
  // Hostels state
  const [faclitiesList, setFaclitiesList] = useState([]);
  const [currentCoordinate, setcurrentCoordinate] = useState({})
  const [galleryImages, setgalleryImages] = useState([]);
  const [profileImageD, setprofileImage] = useState("");
  const [coverImageD, setcoverImage] = useState("");


  const currentUser = useSelector(getUserDetails);
  const allCategories = useSelector(getAllCategoriesData);
  const allTypes = useSelector(getTypeData);
  const allClasses = useSelector(getAllRoomClassData);
  const allHostelsOfCurrentUser = useSelector(getAllHostelsDataOfCurrentUser)
  const pricingId = useSelector(getsinglePricingId);



  const dispatch = useDispatch();


  const notifySuccess = (text) => toast.success(`${text}`);
  // const notifyError = (text) => toast.error(`${text}`);

  useEffect(() => {
    dispatch(fetchAllRoomClass());
    dispatch(fetchAllCategories());
    dispatch(fetchAllType());
    dispatch(fetchAllHostelsOfCurrentUser());
  }, [dispatch])

  const handleUpdateById = (id) => {
    toast.success(id);
  }

  const handleFormDataChanges = (e) => {
    return new Promise((resolve, reject) => {
      const payload = {
        uid: currentUser._id,
        hostelId: e.target.hostelName.value,
        title: e.target.roomName.value,
        tagline: e.target.tagline.value,
        description: e.target.description.value,
        profileImage: profileImageD,
        coverImage: coverImageD,
        galleryImages: galleryImages,
        contactEmail: [e.target.emailAddress.value],
        phoneNumber: [e.target.phoneNumber.value],
        tel: [e.target.telNumber.value],
        roomType: e.target.roomType.value,
        classId: e.target.roomClass.value,
        studentCapacity: e.target.roomCapacity.value,
        totalBeds: e.target.bedCapacityPerRoom.value,
        categoryId: e.target.roomCategory.value,
        roomSize: e.target.roomArea.value,
        facilities: faclitiesList,
        coordinates:currentCoordinate,
        city: e.target.city.value,
        country: e.target.country.value,
        province: e.target.province.value,
        zip: e.target.postalCode.value,
        place: e.target.place.value,
        street: e.target.streetAddress.value,
        pricingId: pricingId,
        
      }
      resolve(payload)

    })
  }

  const uploadFormHandler = (data) => {
    return new Promise((resolve, reject) => {

      const formData = new FormData();
      formData.append('file', data);

      resolve(formData);

    })
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


  const onSubmitHandler = async (e) => {
    e.preventDefault();
   const payload =  await handleFormDataChanges(e);
   const result = await dispatch(addRoom(payload));
   console.log(result, "Result of room");
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


  const onFacilitiesChangeHandler = (e) => {
    e.preventDefault();
    let value = e.target.value;
    const singleItem = value.split(',');
    setFaclitiesList(singleItem);
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

                    <SectionSeperator title="General Information" description="Enter general information of the Rooms"></SectionSeperator>

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">
                          Room Name
                        </label>
                        <input
                          type="text"
                          name="roomName"
                          id="roomName"
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
                                <input onChange={onClickHandlerGalleryImages} id="galleryImages" name="galleryImages" type="file" multiple className="sr-only" />
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
                        <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          type="text"
                          name="emailAddress"
                          id="emailAddress"
                          autoComplete="emailAddress"
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
                        <label htmlFor="telNumber" className="block text-sm font-medium text-gray-700">
                          Tel Number
                        </label>
                        <input
                          type="number"
                          name="telNumber"
                          id="telNumber"
                          autoComplete="telNumber"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                    </div>
                    <SectionSeperator title="Hostel Details" description="Enter hostel details"></SectionSeperator>
                    <div className='grid grid-cols-6 gap-6'>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="hostelName" className="block text-sm font-medium text-gray-700">
                          Hostel
                        </label>
                        <select
                          id="hostelName"
                          name="hostelName"
                          autoComplete="hostelName"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {allHostelsOfCurrentUser.map((item,index)=>{
                           return  <option value={item._id} key={item._id}>{item.general.title}</option>

                          })}
                          

                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
                          Room Type
                        </label>
                        <select
                          id="roomType"
                          name="roomType"
                          autoComplete="roomType"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {allTypes.map((item, index)=>{
                            return <option value={item._id} key={item._id} >{item.typeName}</option>
                          })}
                       
                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="roomClass" className="block text-sm font-medium text-gray-700">
                          Room Class
                        </label>
                        <select
                          id="roomClass"
                          name="roomClass"
                          autoComplete="roomClass"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {allClasses.map((item,index)=>{
                             return <option key={item._id} value={item._id}>{item.classTitle}</option>

                          })}
                          

                        </select>
                      </div>

                      <div className="col-span-3">
                        <label htmlFor="roomCapacity" className="block text-sm font-medium text-gray-700">
                          Student Capacity
                        </label>
                        <input
                          type="number"
                          name="roomCapacity"
                          id="roomCapacity"
                          autoComplete="roomCapacity"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <label htmlFor="roomCategory" className="block text-sm font-medium text-gray-700">
                          Room Category
                        </label>
                        <select
                          id="roomCategory"
                          name="roomCategory"
                          autoComplete="roomCategory"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {allCategories.map((item,index)=>{
                            return <option value={item._id} key={item._id}>{item.categoryName}</option>
                          })}
                

                        </select>
                      </div>

                      <div className="col-span-2">
                        <label htmlFor="bedCapacityPerRoom" className="block text-sm font-medium text-gray-700">
                          Total Beds
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
                        <label htmlFor="roomArea" className="block text-sm font-medium text-gray-700">
                          Room Area
                        </label>
                        <input
                          type="number"
                          name="roomArea"
                          id="roomArea"
                          autoComplete="roomArea"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div className="col-span-6">
                        <label htmlFor="roomFacilities" className="block text-sm font-medium text-gray-700">
                          Facilities
                        </label>
                        <input
                          type="text"
                          name="roomFacilities"
                          id="roomFacilities"
                          autoComplete="roomFacilities"
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
                          autoComplete="city"
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
      </DashboardLayout>
    </>
  )
}


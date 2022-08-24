import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as generateUUID } from 'uuid';

import DashboardLayout from '../DashboardLayout';
import Divider from '../Divider';
import { toast } from "react-hot-toast";
import SectionSeperator from '../../shared/SectionSeperator';

import SectionTitle from '../../shared/SectionTitle';
import { getLoadingStatus, addRoomClass } from "../../../features/dashboard/AdminSlice";


export default function AdminAddNewRoomClass() {

  const [profileImage, setProfileImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [profileImageFormData, setprofileImageFormData] = useState(null);
  const [bannerImageFormData, setbannerImageFormData] = useState(null);
  const [classData, setclassData] = useState({
    classTitle: "",
    classDescription: "",
  })

  const isLoading = useSelector(getLoadingStatus);

  const dispatch = useDispatch();

  const handleFormDataChanges = () => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('classImage', profileImageFormData, profileImageFormData.name);
      formData.append('classBanner', bannerImageFormData, bannerImageFormData.name);
      formData.append('classTitle', classData.classTitle);
      formData.append('classDescription', classData.classDescription);
      resolve(formData);

    })

  }


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (profileImageFormData && bannerImageFormData && classData.classTitle !== "" && classData.classDescription !== "") {

      const result = await dispatch(addRoomClass(await handleFormDataChanges()));
      console.log(result);

      if (result?.payload?.success) {
        toast.success(result.payload.message);
      }
      else if(!(result?.payload?.success)) {
        toast.error(result.payload.message);
      }
    }
    else{
      toast.error("Please fill all required field")
    }
  }

  const onChangeHandlerProfileImage = (e) => {
    setprofileImageFormData(e.target.files[0]);
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  }

  const onChangeHandlerBannerImage = (e) => {
    setbannerImageFormData(e.target.files[0]);
    setBannerImage(URL.createObjectURL(e.target.files[0]));
  }

  const onChangeNameHandler = (e) => {
    setclassData({...classData, classTitle:e.target.value})
  }
  
  const onChangeDescriptionHandler = (e) => {
    setclassData({...classData, classDescription:e.target.value})
  }

  return (
    <>
      <DashboardLayout>
        <form onSubmit={onSubmitHandler}>
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-6">

              <div className="mt-5 md:mt-0 md:col-span-1">


                <div className="shadow mt-5 overflow-hidden sm:rounded-md">
                  <SectionTitle title="Add Room Class"></SectionTitle>

                  <div className="px-4 py-5 bg-white sm:p-6">


                    <SectionSeperator description="Enter Room Class information, e.g. Standard, Premium"></SectionSeperator>

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-6">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Room Class Name
                        </label>
                        <input
                          onChange={onChangeNameHandler}
                          type="text"
                          name="category"
                          id="category"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>


                      <div className="col-span-6 sm:col-span-6">
                        <label htmlFor="category-description" className="block text-sm font-medium text-gray-700">
                         Room Class Description
                        </label>
                        <textarea
                          onChange={onChangeDescriptionHandler}
                          type="text"
                          name="category-description"
                          id="category-description"
                          autoComplete="category-description"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      {/* Image */}
                      <div className='col-span-3'>
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
                                htmlFor="profile-image-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input onChange={onChangeHandlerProfileImage} id="profile-image-upload" name="profile-image-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>

                      <div className='col-span-3'>
                        <label className="block text-sm font-medium text-gray-700">Banner Image</label>
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
                                htmlFor="banner-image-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input onChange={onChangeHandlerBannerImage} id="banner-image-upload" name="banner-image-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>

                      <div className='col-span-3 w-24'>
                        <div className='col-span-2 p-1 cursor-pointer  rounded-lg hover:bg-red-600'>
                          <img src={profileImage} alt="" />
                        </div>
                      </div>
                      <div className='col-span-3 w-24'>
                        <div className='col-span-2 p-1 cursor-pointer  rounded-lg hover:bg-red-600'>
                          <img src={bannerImage} alt="" />
                        </div>
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
      </DashboardLayout>
    </>
  )
}


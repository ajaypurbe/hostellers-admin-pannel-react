import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import DashboardLayout from '../DashboardLayout';
import Divider from "../Divider";
import { upload } from '../../../features/dashboard/AdminSlice';
import { getUserDetails } from '../../../features/authentication/UserSlice';
import { becomeOwner } from '../../../features/dashboard/CustomerSlice';
import toast from 'react-hot-toast';

export default function CustomerBecomeOwner() {

   const [profileImage, setprofileImage] = useState("")
   const [citizenshipImage, setcitizenshipImage] = useState("");
   const activeUser = useSelector(getUserDetails);
   const dispatch = useDispatch();

   const uploadFormHandler = (data) => {
      return new Promise((resolve, reject) => {

         const formData = new FormData();
         formData.append('file', data);

         resolve(formData);

      })
   }

   const submitFormHandler = (e) => {
      return new Promise((resolve, reject) => {

         const payload = {
            uid: activeUser._id,
            firstname: e.target.firstName.value,
            lastname: e.target.lastName.value,
            address: e.target.address.value,
            country: e.target.country.value,
            phonenumber: e.target.phoneNumber.value,
            citizenshipNo: e.target.citizenshipNo.value,
            citizenshipImage: citizenshipImage,
            profileImage: profileImage
         }

         resolve(payload);

      })
   }

   const onClickHandlerProfileImage = async (e) => {
      const payload = await uploadFormHandler(e.target.files[0])
      const result = await dispatch(upload(payload));
      setprofileImage(result.payload.path);
   }

   const onClickHandlerCitizenShipImage = async (e) => {
      const payload = await uploadFormHandler(e.target.files[0])
      const result = await dispatch(upload(payload));
      setcitizenshipImage(result.payload.path);
   }

   const onSubmitHandler = async (e) => {
      e.preventDefault();
      
      const payload = await submitFormHandler(e);
      const result = await dispatch(becomeOwner(payload));
      if (result?.payload?.error) {
         toast.error(result.payload.error.message);
      }
      else if (result?.payload?.success) {
         toast.success(result.payload.message);
      }
      else {
         toast.error(result.payload.message);
      }
   }

   return (
      <>
         <DashboardLayout>
            <div>
               <div className="mt-10 sm:mt-0">
                  <div className="md:grid md:grid-cols-1 md:gap-6">
                     <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                           <h3 className="text-lg font-medium leading-6 text-gray-900">Become Owner</h3>
                           <p className="mt-1 text-sm text-gray-600">Please fill only valid information to get verified quickly</p>
                        </div>
                     </div>

                     <div className="mt-5 md:mt-0 md:col-span-1">

                        <form onSubmit={onSubmitHandler}>
                           <div className="shadow overflow-hidden sm:rounded-md">

                              <div className="px-4 py-5 bg-white sm:p-6">
                                 <div className=' grid grid-cols-2'>
                                    {/* Photo */}
                                    <div className='col-span-2 md:col-span-1'>
                                       <label className="block text-sm font-medium text-gray-700">Profile photo</label>
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
                                                   <input onChange={onClickHandlerProfileImage} id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                             </div>
                                             <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                          </div>
                                       </div>
                                    </div>
                                    {/* Photo end */}
                                    {/* Photo */}
                                    <div className='col-span-2 md:col-span-1'>
                                       <label className="block text-sm font-medium text-gray-700">Citizenship photo</label>
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
                                                   <input onChange={onClickHandlerCitizenShipImage} id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                             </div>
                                             <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                          </div>
                                       </div>
                                    </div>
                                    {/* Photo end */}
                                 </div>
                                 <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                       <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                          First name
                                       </label>
                                       <input
                                          type="text"
                                          name="firstName"
                                          id="firstName"
                                          autoComplete="firstName"
                                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                          Last name
                                       </label>
                                       <input
                                          type="text"
                                          name="lastName"
                                          id="lastName"
                                          autoComplete="lastName"
                                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-6">
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

                                    <div className="col-span-6 sm:col-span-2">
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

                                    <div className="col-span-6 sm:col-span-2">
                                       <label htmlFor="citizenshipNo" className="block text-sm font-medium text-gray-700">
                                          Citizenship No.
                                       </label>
                                       <input
                                          type="text"
                                          name="citizenshipNo"
                                          id="citizenshipNo"
                                          autoComplete="citizenshipNo"
                                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                       />
                                    </div>
                                    <div className="col-span-6 sm:col-span-2">
                                       <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                          Phone No.
                                       </label>
                                       <input
                                          type="number"
                                          name="phoneNumber"
                                          id="phoneNumber"
                                          autoComplete="phoneNumber"
                                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                       />
                                    </div>
                                    <div className="col-span-6">
                                       <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                          Street address
                                       </label>
                                       <input
                                          type="text"
                                          name="address"
                                          id="address"
                                          autoComplete="address"
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
                                          autoComplete="city"
                                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                       <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                          State / Province
                                       </label>
                                       <input
                                          type="text"
                                          name="state"
                                          id="state"
                                          autoComplete="state"
                                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                       <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                                          ZIP / Postal code
                                       </label>
                                       <input
                                          type="text"
                                          name="zip"
                                          id="zip"
                                          autoComplete="zip"
                                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                       />
                                    </div>
                                 </div>
                              </div>
                              <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                                 <button
                                    type="submit"
                                    className="inline-flex justify-center  py-2 px-20 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                 >
                                    Apply
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>

               <Divider></Divider>


            </div>
         </DashboardLayout>
      </>
   )
}


import React from 'react';
// import { useDispatch } from 'react-redux';
import { LockClosedIcon } from '@heroicons/react/solid'

import DashboardLayout from '../DashboardLayout';
import {toast} from "react-hot-toast";


export default function OwnerSettings() {

    // const dispatch = useDispatch();

    // const ref = useRef(null);


    const notifySuccess = (text) => toast.success(`${text}`);
    // const notifyError = (text) => toast.error(`${text}`);


    return (
       <>
          <DashboardLayout>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
               <div className="max-w-md w-full space-y-8">
                  <div>

                     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Change your password</h2>
                     <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                           you can change your password anytime later!
                        </a>
                     </p>
                  </div>
                  <form className="mt-8 space-y-6" action="#" method="POST">
                     <input type="hidden" name="remember" defaultValue="true" />
                     <div className="rounded-md shadow-sm -space-y-px">

                        <div className='my-2'>
                           <label htmlFor="opassword" className="sr-only">
                              Enter old Password
                           </label>
                           <input
                              id="opassword"
                              name="opassword"
                              type="password"
                              autoComplete="current-password"
                              required
                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              placeholder="Enter Old Password"
                           />
                        </div>
                        <div className='my-2'>
                           <label htmlFor="npassword" className="sr-only">
                              Enter New Password
                           </label>
                           <input
                              id="npassword"
                              name="npassword"
                              type="password"
                              autoComplete="new-password"
                              required
                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              placeholder="Enter New Password"
                           />
                        </div>
                        <div className='my-4'>
                           <label htmlFor="cpassword" className="sr-only">
                              Enter New Password
                           </label>
                           <input
                              id="cpassword"
                              name="cpassword"
                              type="password"
                              autoComplete="confirm-password"
                              required
                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              placeholder="Confirm New Password"
                           />
                        </div>
                     </div>

                     {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                           <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                           />
                           <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                              Remember me
                           </label>
                        </div>

                        <div className="text-sm">
                           <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                              Forgot your password?
                           </a>
                        </div>
                     </div> */}

                     <div>
                        <button
                           type="submit"
                           className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                           <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                              <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                           </span>
                          Change Password
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </DashboardLayout>
       </>
    )
}


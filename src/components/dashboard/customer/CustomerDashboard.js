import DashboardLayout from '../DashboardLayout';
import IconList from '../../../helpers/IconsList';
import React from 'react';
import { Link } from 'react-router-dom';
export default function OwnerDashboard() {
  return (
    <>
      <DashboardLayout>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <div className="mt-4">
            <div className='m-auto grid grid-cols-2 mb-20'>
             
            <Link  to={"/dashboard/become-owner"} className=" m-2 w-1/4 text-right py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Become Owner
            </Link>
            </div>
              <div className="flex flex-wrap -mx-6">
                <div className="w-full px-6 sm:w-1/2 xl:w-1/2">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-hostellersLight-100 bg-opacity-80">
                    <div className="p-3 rounded-full bg-white bg-opacity-75">
                      {IconList.Home}
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-hostellersLight-primary">0</h4>
                      <div className="text-gray-500">Booked Hostels</div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-6 sm:w-1/2 xl:w-1/2">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-hostellersLight-100 bg-opacity-80">
                    <div className="p-3 rounded-full bg-white bg-opacity-75">
                      {IconList.Dashboard}
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-hostellersLight-primary">0</h4>
                      <div className="text-gray-500">Booked Rooms</div>
                    </div>
                  </div>
                </div>
              
              </div>
            </div> 
          </div>
        </main>
      </DashboardLayout >
    </>
  )
}


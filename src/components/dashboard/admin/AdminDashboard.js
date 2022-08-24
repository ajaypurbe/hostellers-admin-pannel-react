
import DashboardLayout from '../DashboardLayout';
import { toast } from "react-hot-toast";
import IconList from '../../../helpers/IconsList';


import React, { useEffect } from 'react';
import PrimaryLinkButton from '../../shared/button/PrimaryLinkButton';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllHostels, getAllHostelsData, fetchAllRoom, getAllRoomData } from '../../../features/dashboard/AdminSlice';
import { API_URL } from '../../../helpers/ApiUrl';
import SectionTitle from "../../shared/SectionTitle";


export default function AdminDashboard() {

  const hostelsData = useSelector(getAllHostelsData);
  const roomsData = useSelector(getAllRoomData);

  const handleUpdateById = (id) => {
    toast.success(id);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllHostels());
    dispatch(fetchAllRoom());
  }, [dispatch])


  return (
    <>
      <DashboardLayout>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <div className="mt-4">
              <div className="flex flex-wrap -mx-6">
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-hostellersLight-100 bg-opacity-80">
                    <div className="p-3 rounded-full bg-white bg-opacity-75">
                      {IconList.Home}
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-hostellersLight-primary">{hostelsData.length}</h4>
                      <div className="text-gray-500">Total Hostels</div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-hostellersLight-100 bg-opacity-80">
                    <div className="p-3 rounded-full bg-white bg-opacity-75">
                      {IconList.Dashboard}
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-hostellersLight-primary">{roomsData.length}</h4>
                      <div className="text-gray-500">Total Rooms</div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-hostellersLight-100 bg-opacity-80">
                    <div className="p-3 rounded-full bg-white bg-opacity-75">
                      {IconList.Settings}
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-hostellersLight-primary">3</h4>
                      <div className="text-gray-500">Total Users</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
            </div>

            <div className="flex flex-col mt-8">
              <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div
                  className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                  <div>
                    {/* Hostels */}
                    <SectionTitle title="Hostels"></SectionTitle>
                    <div className="flex flex-col">
                      <div className="-my-2 overflow-y-auto mb-20 sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Profile Image
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Hostel Name
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Address
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Hostel Type
                                  </th>
                                  
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Action
                                  </th>



                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {hostelsData?.map((hostel) => (
                                  <tr key={hostel._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full" src={`${API_URL}/${hostel?.image?.profileImage}`} alt="" />
                                      </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <p className='text-md'>{hostel?.general?.title}</p>

                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <p className='text-md'>{`${hostel?.address.place}, ${hostel?.address?.city}`}</p>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <p className='text-md'>{hostel?.hostelDetails?.hostelType?.typeName}</p>
                                      </div>
                                    </td>

                                    

                                    <td className="px-6 py-4 whitespace-nowrap flex gap-4 text-right text-sm font-medium">
                                      <button onClick={() => {
                                        handleUpdateById(hostel?._id);
                                      }} className="text-indigo-600 hover:text-indigo-900">
                                        Edit
                                      </button>
                                      <button onClick={() => {
                                        toast.custom((t) => (
                                          <div
                                            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                                              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                                          >
                                            <div className="flex-1 w-0 p-4">
                                              <div className="flex items-start">
                                                <div>Are you sure you want to delete <span className='text-hostellersLight-primary'>{hostel?.general?.title}</span>?</div>
                                              </div>
                                            </div>
                                            <div className="flex border-l border-gray-200 ">
                                              <button
                                                onClick={() => {
                                                  // handleDelete(hostel._id)
                                                  toast.dismiss(t.id);
                                                }}
                                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                                              >
                                                Delete
                                              </button>
                                              <button
                                                onClick={() => toast.dismiss(t.id)}
                                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </div>
                                        ))
                                      }} className="text-red-600 hover:text-indigo-900">
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Hostels */}
                  </div>
                  <div>

                    <SectionTitle title="Rooms"></SectionTitle>

                    {/* Rooms */}
                    <div className="flex flex-col">
                      <div className="-my-2 overflow-y-auto h-96 sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Profile Image
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Room Name
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Address
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Room Type
                                  </th>
                                 
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {roomsData?.map((room) => (
                                  <tr key={room._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full" src={`${API_URL}/${room?.image?.profileImage}`} alt="" />
                                      </div>
                                    </td>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <p className='text-md'>{room?.general?.title}</p>

                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <p className='text-md'>{`${room?.address?.place}, ${room?.address?.city}`}</p>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <p className='text-md'>{room?.type?.typeName}</p>
                                      </div>
                                    </td>

                                    

                                    <td className="px-6 py-4 flex gap-4 whitespace-nowrap text-right text-sm font-medium">
                                      <button onClick={() => {
                                        handleUpdateById(room._id);
                                      }} className="text-indigo-600 hover:text-indigo-900">
                                        Edit
                                      </button>
                                      <button onClick={() => {
                                        toast.custom((t) => (
                                          <div
                                            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                                              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                                          >
                                            <div className="flex-1 w-0 p-4">
                                              <div className="flex items-start">
                                                <div>Are you sure you want to delete <span className='text-hostellersLight-primary'>{room.general.title}</span>?</div>
                                              </div>
                                            </div>
                                            <div className="flex border-l border-gray-200">
                                              <button
                                                onClick={() => {
                                                  // handleDelete(item._id)
                                                  toast.dismiss(t.id);
                                                }}
                                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                                              >
                                                Delete
                                              </button>
                                              <button
                                                onClick={() => toast.dismiss(t.id)}
                                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </div>
                                        ))
                                      }} className="text-red-600 hover:text-indigo-900">
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Rooms */}
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


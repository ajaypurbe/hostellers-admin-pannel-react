import React,{useEffect} from 'react';
import DashboardLayout from '../DashboardLayout';
import { toast } from 'react-hot-toast';
import PrimaryLinkButton from '../../shared/button/PrimaryLinkButton';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAllRoom, getAllRoomData } from '../../../features/dashboard/AdminSlice';
import { API_URL } from '../../../helpers/ApiUrl';


function AdminRooms() {
  const notifySuccess = (text) => toast.success(`${text}`);
  
  const roomsData = useSelector(getAllRoomData);
  console.log(roomsData);

  const handleUpdateById = (id) => {
    toast.success(id);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllRoom());
  }, [dispatch])


  return (
    <>
      <DashboardLayout>
        <div className='flex justify-between my-5'>
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Rooms</h3>
            <p className="mt-1 text-sm text-gray-600">You can manage hostels that you own from this panel</p>
          </div>
          <div className="px-4 sm:px-0">
           <PrimaryLinkButton goto="/admin/dashboard/rooms/add" title="Add New Room"></PrimaryLinkButton>
          </div>
        </div>
       {/* Table */}
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
                        Profile Image
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
                          <div className="flex items-center">
                            <p className='text-md'>{room.general.title}</p>

                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <p className='text-md'>{`${room.address.place}, ${room.address.city}`}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <p className='text-md'>{room.type?.typeName}</p>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={`${API_URL}/${room.image.profileImage}`} alt="" />
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
        {/* Table end */}
      </DashboardLayout></>
  )
}

export default AdminRooms;
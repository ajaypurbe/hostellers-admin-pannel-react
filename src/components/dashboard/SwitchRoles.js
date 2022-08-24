import React from 'react';

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { getAllPermittedRoles } from "../../features/authentication/RoleSlice";
import SwitchRolesItem from './SwitchRolesItem';
import { setIsAdminTrue, setIsUserTrue, setIsOwnerTrue, getIsOwner, getIsUser, getIsAdmin } from '../../features/authentication/RoleSlice';


export default function SwitchRoles(props) {


  const allPermittedRoles = useSelector(getAllPermittedRoles)
  const allPermittedRolesName = allPermittedRoles?Object.keys(allPermittedRoles):[];
  console.log("All Permitted Roles", allPermittedRolesName);
  const isUser = useSelector(getIsUser);
  const isAdmin = useSelector(getIsAdmin);
  const isOwner = useSelector(getIsOwner);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const populateActiveUserRoles = () => {
    const listOfRolesItem = [];
    for (let i = 0; i < allPermittedRolesName.length; i++) {
      listOfRolesItem.push(<SwitchRolesItem itemkey={i} role={allPermittedRolesName[i]} onClick={() => {
        switch (allPermittedRolesName[i]) {
          case "User":
            dispatch(setIsUserTrue());
            navigate({ pathname: '/dashboard' })
            break;

          case "Admin":
            dispatch(setIsAdminTrue());
            navigate({ pathname: '/admin/dashboard' })
            break;

          case "Owner":
            dispatch(setIsOwnerTrue());
            navigate({ pathname: '/owner/dashboard' })
            break;

          default:
            break;
        }
      }}></SwitchRolesItem>)
    }
    return listOfRolesItem;
  }

  return (

    <Menu as="div" className="relative inline-block text-left z-50">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {isAdmin ? <span className='text-hostellersLight-primary'>Admin</span> : isUser ? <span className='text-hostellersLight-primary'>User</span> : isOwner ? <span className='text-hostellersLight-primary'>Owner</span> : ""}- Switch User Roles
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">

            {populateActiveUserRoles()}

          </div>
        </Menu.Items>
      </Transition>
    </Menu>

  )
}
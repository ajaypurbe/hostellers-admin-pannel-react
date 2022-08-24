import React from 'react';
import { SidebarListItem } from "./SidebarListItem";
import IconsList from "../../helpers/IconsList";
import { useSelector } from 'react-redux';
import { getIsOwner, getIsUser, getIsAdmin } from '../../features/authentication/RoleSlice';


const SidebarDesktop = () => {

    const isUser = useSelector(getIsUser);
    const isAdmin = useSelector(getIsAdmin);
    const isOwner = useSelector(getIsOwner);

    const populateSidebarItem = () => {
        
        return isUser ? <>
            <SidebarListItem title="User Dashboard" goto="/dashboard" svgIcon={IconsList.Dashboard}></SidebarListItem>
            <SidebarListItem title="My Hostels" goto="/dashboard/booked-hostels" svgIcon={IconsList.IconCode}></SidebarListItem>
            <SidebarListItem title="My Rooms" goto="/dashboard/booked-rooms" svgIcon={IconsList.IconCode}></SidebarListItem>
            <SidebarListItem title="Profile" goto="/dashboard/profile" svgIcon={IconsList.Settings}></SidebarListItem>
            <SidebarListItem title="Settings" goto="/dashboard/settings" svgIcon={IconsList.Settings}></SidebarListItem>
            <SidebarListItem title="Become Owner" goto="/dashboard/become-owner" svgIcon={IconsList.Inventroy}></SidebarListItem>
        </> : isOwner ? <>
            <SidebarListItem title="Dashboard" goto="/owner/dashboard" svgIcon={IconsList.Dashboard}></SidebarListItem>
            <SidebarListItem title="My Hostels" goto="/owner/dashboard/hostels" svgIcon={IconsList.IconCode}></SidebarListItem>
            <SidebarListItem title="My Rooms" goto="/owner/dashboard/rooms" svgIcon={IconsList.IconCode}></SidebarListItem>
            <SidebarListItem title="Profile" goto="/owner/dashboard/profile" svgIcon={IconsList.Settings}></SidebarListItem>
            <SidebarListItem title="Settings" goto="/owner/dashboard/settings" svgIcon={IconsList.Settings}></SidebarListItem>
        </> : isAdmin ? <>
            <SidebarListItem title="Dashboard" goto="/admin/dashboard" svgIcon={IconsList.Dashboard}></SidebarListItem>
            <SidebarListItem title="Hostels" goto="/admin/dashboard/hostels" svgIcon={IconsList.IconCode}></SidebarListItem>
            <SidebarListItem title="Categories" goto="/admin/dashboard/categories" svgIcon={IconsList.IconCode}></SidebarListItem>
            <SidebarListItem title="Hostel Type" goto="/admin/dashboard/hostel-type" svgIcon={IconsList.Inventroy}></SidebarListItem>
            <SidebarListItem title="Rooms Class" goto="/admin/dashboard/room-class" svgIcon={IconsList.IconCode}></SidebarListItem>
            <SidebarListItem title="Rooms" goto="/admin/dashboard/rooms" svgIcon={IconsList.IconCode}></SidebarListItem>
            {/* <SidebarListItem title="Users" goto="/admin/dashboard/users" svgIcon={IconsList.IconCode}></SidebarListItem> */}
            {/* <SidebarListItem title="Reviews" goto="/admin/dashboard/reviews" svgIcon={IconsList.IconCode}></SidebarListItem> */}
            <SidebarListItem title="Profile" goto="/admin/dashboard/profile" svgIcon={IconsList.Settings}></SidebarListItem>
            <SidebarListItem title="Settings" goto="/admin/dashboard/settings" svgIcon={IconsList.Settings}></SidebarListItem>
        </> : null
    }
    return (
        <div className="w-64  absolute sm:relative  md:h-full flex-col justify-between hidden sm:flex">
            <div className="px-2 mb-60">
                <ul className="mt-12">

                    {populateSidebarItem()}

                </ul>
                
            </div>
            
        </div>
    )
}

export default SidebarDesktop;
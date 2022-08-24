import React, { Fragment, useEffect } from "react";
import {
    Routes,
    Route,

} from "react-router-dom";

import Homepage from "../components/screen/homepage/Homepage";
import Login from "../components/authentication/login/Login";
import Register from "../components/authentication/register/Register";
import SingleHostel from "../components/screen/singleHostel/SingleHostel";
import SingleRoom from "../components/screen/singleRoom/SingleRoom";

import CustomerDashboard from "../components/dashboard/customer/CustomerDashboard";
import CustomerBookedHostels from "../components/dashboard/customer/CustomerBookedHostels";
import CustomerBookedRooms from "../components/dashboard/customer/CustomerBookedRooms";
import CustomerProfile from "../components/dashboard/customer/CustomerProfile";
import CustomerSettings from "../components/dashboard/customer/CustomerSettings";
import CustomerBecomeOwner from "../components/dashboard/customer/CustomerBecomeOwner";

// Owner Import
import OwnerDashboard from "../components/dashboard/owner/OwnerDashboard";
import OwnerHostels from "../components/dashboard/owner/OwnerHostels";
import OwnerAddNewHostel from "../components/dashboard/owner/OwnerAddNewHostel";
import OwnerProfile from "../components/dashboard/owner/OwnerProfile";
import OwnerRooms from "../components/dashboard/owner/OwnerRooms";
import OwnerSettings from "../components/dashboard/owner/OwnerSettings";

//  Admin Import
import AdminDashboard from "../components/dashboard/admin/AdminDashboard";
import AdminHostels from "../components/dashboard/admin/AdminHostels";
import AdminProfile from "../components/dashboard/admin/AdminProfile";
import AdminRooms from "../components/dashboard/admin/AdminRooms";
import AdminSettings from "../components/dashboard/admin/AdminSettings";
import AdminAddNewHostel from "../components/dashboard/admin/AdminAddNewHostel";
import AdminAddNewRoom from "../components/dashboard/admin/AdminAddNewRoom";
import AdminCategory from "../components/dashboard/admin/AdminCategory";
import AdminAddNewCategory from "../components/dashboard/admin/AdminAddNewCategory";
import AdminHostelType from "../components/dashboard/admin/AdminHostelType";
import AdminAddNewHostelType from "../components/dashboard/admin/AdminAddNewHostelType";
import AdminRoomClass from "../components/dashboard/admin/AdminRoomClass";
import AdminAddNewRoomClass from "../components/dashboard/admin/AdminAddNewRoomClass";


import ProtectedRoute from "./ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { getNewAccessToken, isAuthenticated } from "../features/authentication/AuthSlice";
import { getCurrentUser } from "../features/authentication/UserSlice";
import { getPermittedRoles } from "../features/authentication/RoleSlice";
import ROLES_LIST from "../helpers/RolesList";
import OwnerAddNewRoom from "../components/dashboard/owner/OwnerAddNewRoom";
import PageNotFound from "../components/pagenotfound/PageNotFound";
import AdminUpdateCategory from "../components/dashboard/admin/AdminUpdateCategory";
import BookRoom from "../components/screen/BookRoom";
import BookHostel from "../components/screen/BookHostel";


// import PageNotFound from "../components/pagenotfound/PageNotFound";


export default function AppRoutes() {
    const isUserAuthenticated = useSelector(isAuthenticated);
    const dispatch = useDispatch();
    useEffect(()=>{
        if (isUserAuthenticated) {
            dispatch(getNewAccessToken());
            dispatch(getCurrentUser());
            dispatch(getPermittedRoles());
        }
    })

    // const Roles = useSelector(state => state.roles);

    return (
        <div>
            <Routes>
                <Fragment>
                    <Route exact path="/" element={<Homepage />}></Route>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/register" element={<Register />}></Route>
                    <Route exact path="/explore" element={<Register />}></Route>
                    <Route exact path="/hostels" element={<Register />}></Route>
                    <Route exact path="/hostel/:id" element={<SingleHostel />}></Route>
                    <Route exact path="/hostel/book/:id" element={<BookHostel />}></Route>
                    <Route exact path="/rooms" element={<Register />}></Route>
                    <Route exact path="/rooms/:id" element={<SingleRoom />}></Route>
                    <Route exact path="/rooms/book/:id" element={<BookRoom />}></Route>
             

                    <Route path="/admin/dashboard" element={<ProtectedRoute roles={ROLES_LIST.Admin} component={AdminDashboard} />} />
                    <Route path="/owner/dashboard" element={<ProtectedRoute roles={ROLES_LIST.Owner} component={OwnerDashboard} />} />
                    <Route path="/dashboard" element={<ProtectedRoute roles={ROLES_LIST.User} component={CustomerDashboard} />}></Route>
                    <Route path="/dashboard/booked-hostels" element={<ProtectedRoute roles={ROLES_LIST.User} component={CustomerBookedHostels} />}/>
                    <Route path="/dashboard/booked-rooms" element={<ProtectedRoute roles={ROLES_LIST.User} component={CustomerBookedRooms} />}/>
                    <Route path="/dashboard/profile" element={<ProtectedRoute roles={ROLES_LIST.User} component={CustomerProfile} />}/>
                    <Route path="/dashboard/settings" element={<ProtectedRoute roles={ROLES_LIST.User} component={CustomerSettings} />}/>
                    <Route path="/dashboard/become-owner" element={<ProtectedRoute roles={ROLES_LIST.User} component={CustomerBecomeOwner} />}/>

                    {/*  Owner routes */}
                    <Route path="owner/dashboard/hostels" element={<ProtectedRoute roles={ROLES_LIST.User} component={OwnerHostels} />}/>
                    <Route path="owner/dashboard/hostels/add" element={<ProtectedRoute roles={ROLES_LIST.User} component={OwnerAddNewHostel} />}/>
                    <Route path="owner/dashboard/rooms" element={<ProtectedRoute roles={ROLES_LIST.User} component={OwnerRooms} />}/>
                    <Route path="owner/dashboard/rooms/add" element={<ProtectedRoute roles={ROLES_LIST.User} component={OwnerAddNewRoom} />}/>
                    <Route path="owner/dashboard/profile" element={<ProtectedRoute roles={ROLES_LIST.User} component={OwnerProfile} />}/>
                    <Route path="owner/dashboard/settings" element={<ProtectedRoute roles={ROLES_LIST.User} component={OwnerSettings} />}/>
              
                    {/*  Admin routes */}
                    <Route path="admin/dashboard/categories" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminCategory} />}/>
                    <Route path="admin/dashboard/categories/add" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminAddNewCategory} />}/>
                    <Route path="admin/dashboard/categories/update/:id" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminUpdateCategory} />}/>
                    <Route path="admin/dashboard/hostels" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminHostels} />}/>
                    <Route path="admin/dashboard/hostels/add" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminAddNewHostel} />}/>
                    <Route path="admin/dashboard/hostel-type" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminHostelType} />}/>
                    <Route path="admin/dashboard/hostel-type/add" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminAddNewHostelType} />}/>
                    <Route path="admin/dashboard/room-class" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminRoomClass} />}/>
                    <Route path="admin/dashboard/room-class/add" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminAddNewRoomClass} />}/>
                    <Route path="admin/dashboard/rooms" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminRooms} />}/>
                    <Route path="admin/dashboard/rooms/add" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminAddNewRoom} />}/>
                    <Route path="admin/dashboard/profile" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminProfile} />}/>
                    <Route path="admin/dashboard/settings" element={<ProtectedRoute roles={ROLES_LIST.User} component={AdminSettings} />}/>
                    <Route exact path="*" element={<PageNotFound />}></Route>
                    
                </Fragment>
            </Routes>
        </div>

    );
}


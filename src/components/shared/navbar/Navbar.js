import React, { useState } from "react";
import Logo from "../../../assets/logo/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


// import ToggleMode from "../../darkmode/ToggleMode";
import BorderButton from "../button/BorderButton";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isAuthenticated, logout } from "../../../features/authentication/AuthSlice";
import { getUserDetails } from "../../../features/authentication/UserSlice";
import { setAllFalse } from "../../../features/authentication/RoleSlice";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isUserAuthenticated = useSelector(isAuthenticated);
  const getCurrentUserDetails = useSelector(getUserDetails);
  const dispatch = useDispatch();

  const Roles = useSelector(state => state.roles);

  return (
    <div className="fixed mb-20 py-2 container float-right max-w-none bg-white z-50">
      <section
        className="xl:bg-contain bg-top bg-no-repeat"
      >
        <div className="container px-4 mx-auto">
          <nav className="flex justify-between items-center pt-2">
            <Link className="text-3xl font-semibold leading-none" to="/">
              <img className="h-10" src={`${Logo}`} alt="" width="auto" />
            </Link>
            

            <div className=" flex justify-center items-center">
              <div className="lg:hidden">
                <button
                  onClick={() => {
                    setIsMenuOpen(true);
                  }}
                  className="flex justify-end items-end ml-36 py-2 px-3 text-hostellersLight-primary hover:text-blue-700 rounded border border-blue-200 hover:border-blue-300"
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
              {/* <ToggleMode></ToggleMode> */}

              {isUserAuthenticated ? <>
               
                <Link to={Roles.isAdmin ? "/admin/dashboard" : Roles.isOwner ? "/owner/dashboard" : "/dashboard"}><div className="flex items-center space-x-4">
                  <div className="hidden md:inline-block flex-auto space-y-0">
                    <div className="text-sm text-hostellersLight-primary font-semibold">
                      <p>{getCurrentUserDetails?.username}</p>
                    </div>
                    <div className="mt-0.5 text-xs">{getCurrentUserDetails?.email}</div>
                  </div>
                  <img src={`${Logo}`} className="hidden md:inline-block flex-none w-6 h-6 rounded-full object-cover" alt="" />

                </div></Link>
                <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-5">
                  <li>
                    <BorderButton onClick={() => {
                      if (isUserAuthenticated) {
                        dispatch(logout());
                        dispatch(setAllFalse());
                      }
                    }} goto="/login" title="Logout"></BorderButton>
                  </li>

                </ul>
                


              </> : <><div>
                <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-5">
                  <li>
                    <BorderButton goto="/login" title="Login"></BorderButton>
                  </li>
                  <li>
                    <BorderButton goto="/register" title="Register"></BorderButton>
                  </li>
                </ul>
              </div></>}

              {isMenuOpen ? (
                <div>
                  <div className="navbar-menu shadow-xl fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50">
                    <div className="navbar-backdrop fixed inset-0 bg-blueGray-800 opacity-25"></div>
                    <nav className="relative flex flex-col py-2 px-4 w-full h-full  bg-white shadow-2xl overflow-y-auto">
                      <div className="flex items-center mb-8">
                        <Link
                          className="mr-auto text-3xl font-semibold leading-none"
                          to="/"
                        >
                          <img
                            className="h-10 ml-4 mt-2"
                            src={`${Logo}`}
                            alt=""
                            width="auto"
                          />
                        </Link>
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                          }}
                          className="navbar-close"
                        >
                          <svg
                            className="h-6 w-6 text-blueGray-400 cursor-pointer hover:text-blueGray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <div>
                        <ul>

                          {/* <li className="mb-1">
                          <a
                            className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50   hover:text-blue-600"
                            href="/methodology"
                          >
                            Methodology
                          </a>
                        </li> */}
                        </ul>
                        {isUserAuthenticated ? <>
                          <div>
                          <Link to={Roles.isAdmin ? "/admin/dashboard" : Roles.isOwner ? "/owner/dashboard" : "/dashboard"}><div className="flex items-center space-x-4">
                            <div className="flex-auto items-center space-y-0">
                              <div className="text-sm text-hostellersLight-primary font-semibold">
                                <p>{getCurrentUserDetails?.username}</p>
                              </div>
                              <div className="mt-0.5 text-xs">{getCurrentUserDetails?.email}</div>
                            </div>
                            <img src={`${Logo}`} className="flex-none w-6 h-6 rounded-full object-cover" alt="" />

                          </div></Link>
                          <ul className=" lg:flex lg:items-center lg:w-auto lg:space-x-5">
                            <li>
                              <BorderButton onClick={() => {
                                if (isUserAuthenticated) {
                                  dispatch(logout());
                                  dispatch(setAllFalse());
                                }
                              }} goto="/login" title="Logout"></BorderButton>
                            </li>

                          </ul>
                          </div>


                        </> : <><div>
                          <ul className="lg:flex lg:items-center lg:w-auto lg:space-x-5">
                            <li>
                              <BorderButton goto="/login" title="Login"></BorderButton>
                            </li>
                            <li>
                              <BorderButton goto="/register" title="Register"></BorderButton>
                            </li>
                          </ul>
                        </div></>
                        }

                      </div>
                      <div className="mt-auto">
                        <p className="my-4   text-xs text-blueGray-400">
                          <span>Get in Touch </span>
                          <a
                            className="text-hostellersLight-primary hover:text-blue-600 underline"
                            href="/"
                          >
                            info@hostellers.com.np
                          </a>
                        </p>

                      </div>
                    </nav>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}


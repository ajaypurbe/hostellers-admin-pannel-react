import React, { useState } from "react";

import SidebarMobile from "./SidebarMobile";
import SidebarDesktop from "./SidebarDesktop";
import SwitchRoles from "./SwitchRoles";

const Sidebar = (props)=> {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const sidebarHandler = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }
    return (
        <div className="flex flex-no-wrap">
            {/* Sidebar starts */}
            {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
            <SidebarDesktop></SidebarDesktop>
            <div>
                <div className="h-10 w-10 bg-hostellersLight-primary absolute md:hidden right-0 mt-16  flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer" id="mobile-toggler" onClick={sidebarHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx={6} cy={10} r={2} />
                        <line x1={6} y1={4} x2={6} y2={8} />
                        <line x1={6} y1={12} x2={6} y2={20} />
                        <circle cx={12} cy={16} r={2} />
                        <line x1={12} y1={4} x2={12} y2={14} />
                        <line x1={12} y1={18} x2={12} y2={20} />
                        <circle cx={18} cy={7} r={2} />
                        <line x1={18} y1={4} x2={18} y2={5} />
                        <line x1={18} y1={9} x2={18} y2={20} />
                    </svg>
                </div>
                {isMobileMenuOpen ? <>
                <SidebarMobile></SidebarMobile>
                </> : <></>}
            </div>
            {/* Sidebar ends */}
            {/* Remove class [ h-64 ] when adding a card block */}
            <div className="container shadow-sm mx-auto py-10 md:w-4/5 w-11/12 px-6">
                <div className="float-right -mt-10">
                <SwitchRoles ></SwitchRoles>
                </div>
                {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
                {/* <div className="w-full h-full rounded border-dashed border-2 border-gray-300"><p>{props.children}</p></div> */}
                <div className="w-full h-full rounded border-gray-300"><div>{props.children}</div></div>
            </div>
        </div>
    );
}

export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';

export const SidebarListItem = (props) => {
    return (
        <li className="flex w-full active justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
            <div className="flex items-center">
                {props.svgIcon}
                <Link className="text-sm  ml-2" to={props.goto}>{props.title}</Link>
            </div>
        </li>
    )
}

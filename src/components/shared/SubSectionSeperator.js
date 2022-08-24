import React from 'react'

function SubSectionSeperator(props) {
    return (
        <div className="md:col-span-1 my-5">
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-medium leading-6 text-slate-900">{props.title}</h3>
                <p className="mt-1 text-xs text-gray-600">{props.description}</p>
            </div>
        </div>
    )
}

export default SubSectionSeperator;
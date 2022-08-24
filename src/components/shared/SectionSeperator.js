import React from 'react'

function SectionSeperator(props) {
    return (
        <div className="md:col-span-1 my-5">
            <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-hostellersLight-primary">{props.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{props.description}</p>
            </div>
        </div>
    )
}

export default SectionSeperator;
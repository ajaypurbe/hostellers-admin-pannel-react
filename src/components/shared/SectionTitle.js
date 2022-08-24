import React from 'react'

function SectionTitle(props) {
  return (
    <div className="px-4  py-3 text-hostellersLight-primary bg-hostellersLight-600 bg-opacity-10 text-center sm:px-6 font-semibold ">
    <p >
     {props.title}
    </p>
  </div>
  )
}

export default SectionTitle
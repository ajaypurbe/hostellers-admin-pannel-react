import React from 'react'

const BigTitle = (props) => {
  return (
    <div className="px-4 py-6 text-lg md:text-3xl rounded-md text-hostellersLight-primary bg-hostellersLight-400 bg-opacity-10 text-center sm:px-6 font-semibold ">
    <p >
     {props.title}
    </p>
  </div>
  )
}

export default BigTitle
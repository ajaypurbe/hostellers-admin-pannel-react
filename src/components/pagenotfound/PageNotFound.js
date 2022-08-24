import React from 'react'
import { Link } from 'react-router-dom'


export default function PageNotFound() {
    return (
        <div>
            ailwind CSS 404 Error Page with shadow card and gradient background.

            <div
                className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-hostellersLight-600 to-hostellersLight-primary"
            >
                <div className="px-40 py-20 bg-white rounded-md shadow-xl">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-hostellersLight-primary text-9xl">404</h1>

                        <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                            <span className="text-red-500">Oops!</span> Page not found
                        </h6>

                        <p className="mb-8 text-center text-gray-500 md:text-lg">
                            Looks like you got lost.
                        </p>

                        <Link
                            to="/"
                            className="px-6 py-2 text-sm font-semibold  text-hostellersLight-1000 bg-hostellersLight-600 bg-opacity-20 rounded-sm p-5"
                        >Go home</Link>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

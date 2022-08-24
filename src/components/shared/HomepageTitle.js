import React from 'react'

const HomepageTitle = (props) => {
    return (
        <div>
            <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4">
                    <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                        <span className="font-medium text-lg text-primary mb-2 block">
                            {props.subtitle}
                        </span>
                        <h2
                            className="font-bold text-3xl sm:text-4xl md:text-[40px] text-hostellersLight-primary mb-4 "
                        >
                           {props.title}
                        </h2>
                        <p className="text-base text-body-color">
                            {props.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomepageTitle
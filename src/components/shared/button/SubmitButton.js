import React, { Component } from 'react'

export default class SubmitButton extends Component {
    render(props) {
        return (
            <div>
                <button
                  {...this.props.disabled}
                  className={`mr-2 inline-block px-4 py-3 font-semibold transition-all duration-500 text-hostellersLight-primary bg-opacity-50 bg-hostellersLight-100 hover:bg-hostellersLight-100 hover:bg-opacity-100  leading-none rounded`}
                  type='submit'
                >
                  {this.props.title}
                </button>
            </div>
        )
    }
}

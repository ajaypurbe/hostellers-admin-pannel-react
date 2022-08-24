import React, { Component } from 'react'

export default class HeroButton extends Component {
    render(props) {
        return (
            <div>
                <a
                  className="mr-2 inline-block px-4 py-3 font-semibold transition-all duration-500 text-hostellersLight-primary hover:bg-hostellersLight-100 hover:bg-opacity-50 leading-none rounded"
                  href="/"
                >
                  {this.props.title}
                </a>
            </div>
        )
    }
}

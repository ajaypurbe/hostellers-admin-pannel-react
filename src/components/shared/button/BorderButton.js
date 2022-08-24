import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BorderButton extends Component {
    render() {
        return (
            <div>
                <Link
                  onClick={this.props.onClick}
                  className="mr-2 inline-block px-4 py-3 font-semibold hover:shadow-md hover:w-72 hover:md:w-auto transition-all duration-500 text-hostellersLight-primary hover:text-hostellersLight-800 leading-none  rounded"
                  to={this.props.goto}
                >
                  {this.props.title}
                </Link>
            </div>
        )
    }
}

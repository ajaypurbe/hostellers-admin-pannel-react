// Autocomplete.js
import React, { Component } from 'react';

class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.clearSearchBox = this.clearSearchBox.bind(this);
    }

    componentDidMount({ map, mapApi } = this.props) {
        const options = {
            // restrict your search to a specific type of result
            types: ['address'],
            // restrict your search to a specific country, or an array of countries
            // componentRestrictions: { country: ['gb', 'us'] },
        };
        this.autoComplete = new mapApi.places.Autocomplete(
            this.searchInput,
            options,
        );
        this.autoComplete.addListener('place_changed', this.onPlaceChanged);
        this.autoComplete.bindTo('bounds', map);
    }

    componentWillUnmount({ mapApi } = this.props) {
        mapApi.event.clearInstanceListeners(this.searchInput);
    }

    onPlaceChanged = ({ map, addplace } = this.props) => {
        const place = this.autoComplete.getPlace();

        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        addplace(place);
        this.searchInput.blur();
    };

    clearSearchBox() {
        this.searchInput.value = '';
    }

    render() {
        return (
            <div className='m-auto text-center w-96 p-2 flex space-x-9 '>
                <input
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={(ref) => {
                        this.searchInput = ref;
                    }}
                    type="text"
                    onFocus={this.clearSearchBox}
                    placeholder="Search Location"
                />
            </div>
        );
    }
}

export default AutoComplete;
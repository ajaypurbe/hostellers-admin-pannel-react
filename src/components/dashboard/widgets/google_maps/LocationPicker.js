import React, { Component } from 'react';
import {MAPS_API_KEY} from "../../../../helpers/MAPS_API_KEY";

import GoogleMapReact from 'google-map-react';

import AutoComplete from './Autocomplete';
import Marker from './Marker';


class LocationPicker extends Component {

    state = {
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geoCoder: null,
        places: [],
        center: [{lat: 41, 
          lng: -71}],
        zoom: 9,
        address: '',
        draggable: true,
        lat: null,
        lng: null
    };

    componentDidUpdate(){
      this.setCurrentLocation();
    }


    onMarkerInteraction = (childKey, childProps, mouse) => {
        this.setState({
            draggable: false,
            lat: mouse.lat,
            lng: mouse.lng
        });
    }
    onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
        this.setState({ draggable: true });
        this._generateAddress();
        this.props.currentCoordinateHandler({"lat": this.state.lat, "lng":this.state.lng});

    }

    _onChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        });

    }

    _onClick = (value) => {
        this.setState({
            lat: value.lat,
            lng: value.lng
        });
        this.props.currentCoordinateHandler({"lat": this.state.lat, "lng":this.state.lng});

    }

    apiHasLoaded = (map, maps) => {
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });

        this._generateAddress();
    };

    addPlace = (place) => {
        this.setState({
            places: [place],
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
        this._generateAddress()
    };

    _generateAddress() {
        const {
            mapApi
        } = this.state;

        const geocoder = new mapApi.Geocoder;

        geocoder.geocode({ 'location': { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
            console.log(results);
            console.log(status);
            console.log(this.state);

            if (status === 'OK') {
                if (results[0]) {
                    this.zoom = 12;
                    this.setState({ address: results[0].formatted_address });
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });

        this.props.currentCoordinateHandler({"lat": this.state.lat, "lng":this.state.lng});

    }

    // Get Current Location Coordinates
    setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: [position.coords.latitude, position.coords.longitude],
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                // this.props.currentCoordinateHandler({"lat": this.state.lat, "lng":this.state.lng});
            });
        }
    }

    render() {
        const {
            mapApiLoaded, mapInstance, mapApi,
        } = this.state;


        return (
            <div className='h-96 rounded-lg bg-clip-border border-2 border-b-hostellersLight-primary mb-20 block'>
              {mapApiLoaded && (
                    <div>
                        <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
                    </div>
                )}
                <GoogleMapReact
                    center={this.state.center}
                    zoom={this.state.zoom}
                    draggable={this.state.draggable}
                    onChange={this._onChange}
                    onChildMouseDown={this.onMarkerInteraction}
                    onChildMouseUp={this.onMarkerInteractionMouseUp}
                    onChildMouseMove={this.onMarkerInteraction}
                    onChildClick={() => console.log('child click')}
                    onClick={this._onClick}
                    bootstrapURLKeys={{
                        key: `${MAPS_API_KEY}`,
                        libraries: ['places', 'geometry'],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
                >

                    <Marker
                        text={this.state.address}
                        lat={this.state.lat}
                        lng={this.state.lng}
                    />


                </GoogleMapReact>
            </div>
        );
    }
}

export default LocationPicker;
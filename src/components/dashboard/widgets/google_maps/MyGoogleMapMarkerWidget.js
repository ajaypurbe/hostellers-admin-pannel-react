import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { MAPS_API_KEY } from '../../../../helpers/MAPS_API_KEY';
import Marker from './Marker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 27.6751429,
      lng: 85.3463909
    },
    zoom:8 
  };

  state =  {
        center : [{
            lat: "",
            lng:""
        }]
  }

  componentDidMount(){
      this.setState({
          center:[{
              lat:this.props.lat,
              lng:this.props.lng
          }]
      })
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: this.props.height, width: this.props.width }}>
        <GoogleMapReact
          bootstrapURLKeys={ {key: `${MAPS_API_KEY}`} }
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        //   center={this.state.center}
        >
          <Marker
            lat={this.props.lat}
            lng={this.props.lng}
            text={this.props.address}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { latLng: [] };
  }

  componentDidMount() {
    fetch('/api/coords')
      .then(res => res.json())
      .then(result => {
        this.setState({ latLng: result });
      })
      .catch(err => console.error(err));
  }

  render() {
    const containerStyle = {
      width: '100%',
      height: '400px',
      border: '1.5px solid black'
    };

    const center = {
      lat: 39,
      lng: -95
    };

    return (
      <div className="container">
        <h1 className='profile-content'>alvarodiazjr</h1>
        <div className='profile-page'>
          <div className='profile-content'>
            <div className="blocks header">My Bikes</div>
            <div className="blocks header">My Rides</div>
          </div>
          <div className='profile-content'>
            <div className="row">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={3}
              >
                {this.state.latLng.map(marker => (
                  <Marker
                    position={{ lat: marker.lat, lng: marker.lng }}
                    key={marker.logId}
                  />
                ))}
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

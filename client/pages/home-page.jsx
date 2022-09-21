import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

export default class HomePage extends React.Component {
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
      <div className="container text-center">
        <h1 className='home-text'>MTBRides</h1>
        <img src="./images/image-1663262324156.png" alt="mtb" className='home-mtb' />
        <div className="row justify-center home-buttons">
          <a href="#sign-in" className="view-logs-btn">Sign In</a>
          <a href="#sign-up" className="view-logs-btn">Sign Up</a>
        </div>
        <div className='profile-content'>
          <div className="row">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={3} />
          </div>
        </div>
      </div>
    );
  }
}

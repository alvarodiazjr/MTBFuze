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
        <img src="./images/mtbfuze.png" alt="logo" className='home-logo'/>
        <div className="row justify-center">
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

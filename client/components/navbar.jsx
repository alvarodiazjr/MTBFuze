import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <header>
        <div className='row container align-center'>
          <div className='column-half mtb-logo'>
            <h1 className='nav-text'>MTB</h1>
            <img className='mtb-image' src="./images/image-1663262324156.png" alt="mtb" />
          </div>
          <div className='column-half text-right'>
            <i className='fa-solid fa-user profile-icon'></i>
          </div>
        </div>
      </header>
    );
  }
}

import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <header className='navbar'>
        <div className='row container align-center'>
          <div className='column-half mtb-logo'>
            <a href="#" className='nav-text'>
              <h1>MTB</h1>
            </a>
            <img className='mtb-image' src="./images/image-1663262324156.png" alt="mtb" />
          </div>
          <div className='column-half text-right'>
            <a href="#homescreen">
              <i className='fa-solid fa-user profile-icon'></i>
            </a>
          </div>
        </div>
      </header>
    );
  }
}

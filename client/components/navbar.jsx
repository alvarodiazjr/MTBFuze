import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpened: false };
    this.clickIcon = this.clickIcon.bind(this);
    this.clickLinks = this.clickLinks.bind(this);
  }

  clickIcon() {
    this.setState({ menuOpened: true });
  }

  clickLinks() {
    this.setState({ menuOpened: false });
  }

  render() {
    const menu = this.state.menuOpened ? 'visible' : 'hidden';
    const { handleSignOut } = this.context;

    return (
      <header className='navbar'>
        <div className='row container align-center'>
          <div className='column-half mtb-logo'>
            <a href="#homescreen" className='nav-text'>
              <h1>MTBFuze</h1>
            </a>
            <img className='mtb-image' src="./images/image-1663262324156.png" alt="mtb" />
          </div>
          <div className='column-half text-right'>
            <i onClick={this.clickIcon} className='fa-solid fa-user profile-icon'></i>
            <div className={`menu text-center ${menu}`}>
              <div className='ad-blocks'>
                <a
                  href="#profile"
                  onClick={this.clickLinks}
                  className='modal-links'>View Profile</a>
              </div>
              <div className='ad-blocks'>
                <a
                  href="#createlog"
                  onClick={this.clickLinks}
                  className='modal-links' >Add a Ride Log</a>
              </div>
              <div className='ad-blocks'>
                <a
                  href="#addbike"
                  onClick={this.clickLinks}
                  className='modal-links' >Add a Bike</a>
              </div>
              <div className='sign-out-block' onClick={this.clickLinks}>
                <button onClick={ handleSignOut } className='sign-out-button'>Sign Out</button>
              </div>
            </div>
            <div onClick={this.clickLinks} className={`modal ${menu}`}></div>
          </div>
        </div>
      </header>
    );
  }
}

Navbar.contextType = AppContext;

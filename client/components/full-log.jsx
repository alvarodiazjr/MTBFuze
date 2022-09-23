import React from 'react';

export default class FullLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rideLog: null,
      modalOpened: false
    };
    this.clickIcon = this.clickIcon.bind(this);
    this.clickLink = this.clickLink.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('user-jwt');
    const req = {
      headers: {
        'X-Access-Token': token
      }
    };

    fetch(`/api/ridelogs/${this.props.logId}`, req)
      .then(res => res.json())
      .then(rideLog => this.setState({ rideLog }))
      .catch(err => console.error(err));
  }

  clickIcon() {
    this.setState({ modalOpened: true });
  }

  clickLink() {
    this.setState({ modalOpened: false });
  }

  render() {
    if (!this.state.rideLog) return null;

    const { photoUrl, location, caption, visitedOn } = this.state.rideLog;

    const date = new Date(visitedOn);
    const newDate = new Intl.DateTimeFormat('en-US').format(date);

    const modal = this.state.modalOpened ? 'visible' : 'hidden';

    return (
      <div className="container">
        <div className="log-wrapper log-page">
          <div className="log-photo-wrapper log-content">
            <img src={photoUrl} alt="img" />
          </div>
          <div className='log-text log-content'>
            <h1>{location}</h1>
            <h3>{caption}</h3>
            <div className='row align-center'>
              <div className='column-half'>
                <p>{newDate}</p>
              </div>
              <div className='column-half text-right'>
                <i onClick={this.clickIcon} className="fa-solid fa-pencil"></i>
              </div>
            </div>
          </div>
        </div>
        <div className={`log-modal-menu text-center ${modal}`}>
          <div className='full-log-buttons'>
            <button onClick={this.clickLink} className='edit-button'>Edit Log</button>
          </div>
          <div className='full-log-buttons'>
            <a href="#delete-modal" className='delete-button' onClick={this.clickLink}>
              Delete Log
            </a>
          </div>
        </div>
        <div onClick={this.clickLink} className={`log-modal ${modal}`}></div>
      </div>
    );
  }
}

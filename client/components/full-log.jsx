import React from 'react';

export default class FullLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rideLog: null,
      modalOpened: false,
      deleteModal: false
    };
    this.clickIcon = this.clickIcon.bind(this);
    this.clickLink = this.clickLink.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
    this.clickDeleteBtn = this.clickDeleteBtn.bind(this);
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
    this.setState({ modalOpened: false, deleteModal: false });
  }

  clickDeleteBtn() {
    this.setState({ deleteModal: true });
  }

  clickDelete(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('user-jwt');
    const req = {
      method: 'DELETE',
      headers: { 'X-Access-Token': token },
      body: JSON.stringify(this.state.rideLog)
    };

    fetch(`/api/ridelogs/${this.props.logId}`, req)
      .then(result => {
        window.location.hash = 'delete-successful';
        this.setState({ rideLog: null });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.rideLog) return null;

    const { photoUrl, location, caption, visitedOn } = this.state.rideLog;

    const date = new Date(visitedOn);
    const newDate = new Intl.DateTimeFormat('en-US').format(date);

    const modal = this.state.modalOpened ? 'visible' : 'hidden';
    const deleteModal = this.state.deleteModal ? 'visible' : 'hidden';
    const hiddenModal = this.state.deleteModal === true
      ? 'hidden'
      : 'visible';

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

        <div className={`log-modal-menu text-center ${modal} ${hiddenModal}`}>
          <div className='full-log-buttons'>
            <button onClick={this.clickLink} className='edit-button'>Edit Log</button>
          </div>
          <div className='full-log-buttons'>
            <button onClick={this.clickDeleteBtn} className='delete-button'>Delete Log</button>
          </div>
        </div>

        <div className={`delete-modal-menu text-center ${deleteModal}`}>
          <div className='row justify-center'>
            <h2>Are you sure you want to delete this log ?</h2>
          </div>
          <div className='row align-center'>
            <div className='column-half'>
              <button onClick={this.clickLink} className='go-back'>Go Back</button>
            </div>
            <div className='column-half'>
              <button onClick={this.clickDelete} className='delete-button'>Yes, Delete</button>
            </div>
          </div>
        </div>

        <div onClick={this.clickLink} className={`log-modal ${modal}`}></div>
      </div>
    );
  }
}

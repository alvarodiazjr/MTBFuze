import React from 'react';

export default class FullLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rideLog: null };
  }

  componentDidMount() {
    fetch(`/api/ridelog/${this.props.logId}`)
      .then(res => res.json())
      .then(rideLog => this.setState({ rideLog }))
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.rideLog) return null;
    const { photoUrl, location, caption, visitedOn } = this.state.rideLog;
    const date = new Date(visitedOn);
    const newDate = new Intl.DateTimeFormat('en-US').format(date);
    return (
      <div className="container">
        <div className="log-wrapper log-page">
          <div className="log-photo-wrapper log-content">
            <img src={photoUrl} alt="img" />
          </div>
          <div className='log-text log-content'>
            <h1>{location}</h1>
            <h3>{caption}</h3>
            <p>{newDate}</p>
          </div>
        </div>
      </div>
    );
  }
}

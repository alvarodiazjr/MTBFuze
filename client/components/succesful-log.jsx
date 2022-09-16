import React from 'react';

export default class LogSuccesful extends React.Component {
  render() {
    return (
      <>
      <div className='container'>
        <div className='success-message' >
          <div className='row justify-center'>
            <h2>Log Created Succesfully!</h2>
          </div>
          <div className='row text-center align-center success-log'>
            <div className='column-half'>
              <a className='log-anchor' href="#createlog">Create Another</a>
            </div>
            <div className='column-half success-log'>
              <button className='view-logs-btn'>View Logs</button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  s;
}

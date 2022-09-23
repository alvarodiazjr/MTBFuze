import React from 'react';
import AppContext from '../lib/app-context';

export default class LogSuccesful extends React.Component {
  render() {
    const { path } = this.context.route;

    const heading = path === 'logsuccess'
      ? 'Log Created Successfully'
      : path === 'bikesuccess'
        ? 'Bike Saved to Profile'
        : 'Log Deleted Successfully';

    const anchorText = path === 'bikesuccess'
      ? 'Add Another'
      : 'Create Another';

    const anchorHref = path === 'bikesuccess'
      ? '#addbike'
      : '#createlog';

    return (
      <div className='container'>
        <div className='success-message' >
          <div className='row justify-center'>
            <h2>{ heading }</h2>
          </div>
          <div className='row text-center align-center success-log'>
            <div className='column-half'>
              <a className='log-anchor' href={anchorHref} >{ anchorText }</a>
            </div>
            <div className='column-half success-log'>
              <a href="#profile" className='view-logs-btn'>View Logs</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LogSuccesful.contextType = AppContext;

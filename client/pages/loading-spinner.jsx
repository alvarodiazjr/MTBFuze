import React from 'react';

export default class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className={`loading-spinner ${this.props.visible}`}></div>
    );
  }
}

import React from 'react';

export default class AuthForm extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="auth-form-wrapper">
          <div className="text-center">
            <h1>Create an Account to get started!</h1>
          </div>
          <div className="auth-wrapper">
            <label htmlFor="username" className="auth-input">Username:</label>
              <input
                required
                type="text"
                name="username"
                id="username"
                className="auth-text-box" />
          </div>
          <div className="auth-wrapper">
            <label htmlFor="password" className="auth-input">Password:</label>
            <input
              required
              type="password"
              name="password"
              id="password"
              className="auth-text-box" />
          </div>
          <div className="row text-center">
            <div className="column-half">
              <a href="#sign-in" className='auth-anchor'>Sign In</a>
            </div>
            <div className="column-half">
              <a href="#sign-in" className="view-logs-btn auth-anchor">Register</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

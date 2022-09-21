import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.registerClick = this.registerClick.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  registerClick(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    };
    fetch('/api/users/sign-up', req)
      .then(res => res.json())
      .then(result => {
        this.setState({ username: '', password: '' });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <form onSubmit={this.registerClick}>
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
                  value={this.state.username}
                  className="auth-text-box"
                  onChange={this.handleChange} />
            </div>
            <div className="auth-wrapper">
              <label htmlFor="password" className="auth-input">Password:</label>
              <input
                required
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                className="auth-text-box"
                onChange={this.handleChange} />
            </div>
            <div className="row text-center">
              <div className="column-half">
                <a href="#sign-in" className='auth-anchor'>Sign In</a>
              </div>
              <div className="column-half">
                <a href="#sign-in">
                  <button className="view-logs-btn auth-anchor">Register</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

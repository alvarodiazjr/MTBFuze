import React from 'react';
import AppContext from '../lib/app-context';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'TestUser',
      password: 'testPass123'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/users/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
        this.setState({ username: '', password: '' });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;

    const heading = action === 'sign-up'
      ? 'Create an Account to get started!'
      : 'Sign in to Continue';

    const button = action === 'sign-up'
      ? 'Register'
      : 'Log In';

    const anchorHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';

    const anchorText = action === 'sign-up'
      ? 'Sign In'
      : 'Sign Up!';

    return (
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="auth-form-wrapper">
            <div className="text-center">
              <h1>{ heading }</h1>
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
                  onChange={handleChange} />
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
                onChange={handleChange} />
            </div>
            <div className="row text-center">
              <div className="column-half">
                <a href={ anchorHref } className='auth-anchor'>{ anchorText }</a>
              </div>
              <div className="column-half">
                <button className="view-logs-btn auth-anchor">{ button }</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

AuthForm.contextType = AppContext;

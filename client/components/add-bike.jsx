import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from './redirect';

export default class AddBikeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      make: '',
      model: '',
      year: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newBike = {
      make: this.state.make,
      model: this.state.model,
      year: this.state.year
    };

    const token = window.localStorage.getItem('user-jwt');

    fetch('/api/bikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify(newBike)
    })
      .then(res => res.json())
      .then(bike => {
        window.location.hash = 'bikesuccess';
        this.setState({ make: '', model: '', year: '' });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.context.user) return <Redirect to='sign-in' />;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="text-center">
            <h1>Add your Bike</h1>
          </div>
          <div className="bike-form-wrapper">
            <div>
              <h3>Make</h3>
            </div>
            <div>
              <label htmlFor="make">
                <input
                  required
                  type="text"
                  name="make"
                  id="make"
                  value={this.state.make}
                  className="text-box"
                  placeholder="ex. Giant"
                  onChange={this.handleChange} />
              </label>
            </div>
            <div>
              <h3>Model</h3>
            </div>
            <div>
              <label htmlFor="model">
                <input
                  required
                  type="text"
                  name="model"
                  id="model"
                  value={this.state.model}
                  className="text-box"
                  placeholder="ex. Model"
                  onChange={this.handleChange} />
              </label>
            </div>
            <div>
              <h3>Year</h3>
            </div>
            <div>
              <label htmlFor="year">
                <input
                  required
                  type="text"
                  name="year"
                  id="year"
                  value={this.state.year}
                  className="text-box"
                  placeholder="ex. 2022"
                  onChange={this.handleChange} />
              </label>
            </div>
          </div>
          <div className='text-center'>
            <button className="submit-button">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

AddBikeForm.contextType = AppContext;

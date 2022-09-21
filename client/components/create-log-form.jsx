import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

class CreateLogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      lat: '',
      lng: '',
      date: '',
      caption: ''
    };
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.addLog = this.addLog.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addLog(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('location', this.state.location);
    formData.append('date', this.state.date);
    formData.append('caption', this.state.caption);
    formData.append('image', this.fileInputRef.current.files[0]);
    formData.append('lat', this.state.lat);
    formData.append('lng', this.state.lng);
    const req = {
      method: 'POST',
      body: formData
    };
    fetch('/api/ridelogs', req)
      .then(res => res.json())
      .then(result => {
        window.location.hash = 'logsuccess';
        this.setState({ location: '', date: '', caption: '', lat: '', lng: '' });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  handleLocationChange = location => {
    this.setState({ location });
  };

  handleSelect = location => {
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ location });
        this.setState({
          lat: latLng.lat,
          lng: latLng.lng
        });
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <form onSubmit={this.addLog}>
        <div className='container'>
          <div className='text-center'>
            <h1>Add a Ride Log</h1>
          </div>
          <div className='create-log-wrapper'>
            <div>
              <h3>Upload a Photo</h3>
            </div>
            <div className='text-right'>
              <label htmlFor="file" className='row nowrap'>
                <input
                  required
                  className='choose-file'
                  type="file"
                  name="image"
                  ref={this.fileInputRef}
                  accept=".png, .jpg, .jpeg, .gif" />
              </label>
            </div>
            <div>
              <h3>Search Location / Trail</h3>
            </div>
            <PlacesAutocomplete
              required
              value={this.state.location}
              onChange={this.handleLocationChange}
              onSelect={this.handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Add Location / Trail ...',
                      className: 'location-search-input'
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      const style = suggestion.active
                        ? { cursor: 'pointer', backgroundColor: '#ffffff' }
                        : {
                            backgroundColor: '#ffffff',
                            cursor: 'pointer',
                            border: '0.5px solid black'
                          };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                          key={index}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <div>
              <h3>Add Visited Date</h3>
            </div>
            <input
              required
              onChange={this.handleChange}
              value={this.state.date}
              name='date'
              className='text-box date'
              type="date"
              placeholder='Month / Day / Year' />
            <div>
              <h3>Add Caption / Comment</h3>
            </div>
            <textarea
              required
              name="caption"
              onChange={this.handleChange}
              value={this.state.caption}
              id="caption"
              cols="30"
              rows="8"
              placeholder='Write your message here'>
            </textarea>
          </div>
          <div className='text-center'>
            <button className='submit-button'>Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default CreateLogForm;

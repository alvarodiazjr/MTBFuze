import React from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import Navbar from './components/navbar';
import HomePage from './pages/home-page';
import Auth from './pages/auth';
import ProfilePage from './pages/profile-page';
import CreateLogForm from './components/create-log-form';
import LogSuccesful from './components/succesful-log';
import FullLog from './components/full-log';
import AddBikeForm from './components/add-bike';
import LoadingSpinner from './pages/loading-spinner';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      isLoading: false
    };
    this.renderPage = this.renderPage.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const hashRoute = parseRoute(window.location.hash);
      this.setState({ route: hashRoute });
    });
    const token = window.localStorage.getItem('user-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('user-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('user-jwt');
    this.setState({ user: null });
  }

  isLoading(value) {
    this.setState({
      isLoading: value
    });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }
    if (path === 'profile') {
      return <ProfilePage />;
    }
    if (path === 'createlog') {
      return <CreateLogForm />;
    }
    if (path === 'logsuccess' || path === 'bikesuccess' || path === 'delete-successful') {
      return <LogSuccesful />;
    }
    if (path === 'fulllog') {
      const logId = this.state.route.params.get('logId');
      return <FullLog logId={logId} />;
    }
    if (path === 'addbike') {
      return <AddBikeForm />;
    }
    return <HomePage />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route, token } = this.state;
    const { handleSignIn, handleSignOut, isLoading } = this;
    const contextValue = { user, route, token, handleSignIn, handleSignOut, isLoading };
    if (navigator.onLine === false) {
      return <div className='error-message'>Sorry, there was an error connecting to the network! Please check your internet connection and try again.</div>;
    } else {
      return (
        <AppContext.Provider value={contextValue}>
          <>
            <Navbar />
            {this.state.isLoading
              ? <LoadingSpinner visible='visible' />
              : <LoadingSpinner visible='hidden' />
            }
            {this.renderPage()}
          </>
        </AppContext.Provider>
      );
    }
  }
}

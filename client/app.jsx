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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
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

  renderPage() {
    const { path } = this.state.route;
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }
    if (path === 'profile') {
      return <ProfilePage />;
    }
    if (path === 'createlog' || path === '') {
      return <CreateLogForm />;
    }
    if (path === 'logsuccess' || path === 'bikesuccess') {
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
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, token, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Navbar />
          {this.renderPage()}
        </>
      </AppContext.Provider>
    );
  }
}

import React from 'react';
import Navbar from './components/navbar';
import LogSuccesful from './components/succesful-log';
import parseRoute from './lib/parse-route';
import Script from './components/script-loader';
import ProfilePage from './pages/profile-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const hashRoute = parseRoute(window.location.hash);
      this.setState({ route: hashRoute });
    });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === 'createlog' || path === '') {
      return <Script />;
    }
    if (path === 'logsuccess') {
      return <LogSuccesful />;
    }
    if (path === 'profile') {
      return <ProfilePage />;
    }
  }

  render() {
    return (
      <>
      <Navbar />
      { this.renderPage() }
      </>
    );
  }
}

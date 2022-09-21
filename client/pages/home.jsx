import React from 'react';
import Navbar from '../components/navbar';
import LogSuccesful from '../components/succesful-log';
import parseRoute from '../lib/parse-route';
import ProfilePage from './profile-page';
import CreateLogForm from '../components/create-log-form';
import FullLog from '../components/full-log';
import AddBikeForm from '../components/add-bike';

export default class Home extends React.Component {
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
      return <CreateLogForm />;
    }
    if (path === 'logsuccess' || path === 'bikesuccess') {
      return <LogSuccesful action={path} />;
    }
    if (path === 'profile') {
      return <ProfilePage />;
    }
    if (path === 'fulllog') {
      const logId = this.state.route.params.get('logId');
      return <FullLog logId={logId} />;
    }
    if (path === 'addbike') {
      return <AddBikeForm />;
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

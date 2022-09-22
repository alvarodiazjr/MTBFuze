import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class Auth extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="profile" />;

    return (
      <>
        <AuthForm
          key={route.path}
          action={route.path}
          onSignIn={handleSignIn} />
      </>
    );
  }
}

Auth.contextType = AppContext;

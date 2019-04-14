import React, { Component } from 'react';

const style = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
};

class AuthCallback extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      authenticated: false,
      err: null,
    };
  }

  componentDidMount() {
    const auth = this.context.getService('auth');
    auth.handleAuthentication()
    .then(() => this.setState({ authenticated: true }))
    .catch(err => this.setState({ err }));
  }

  render() {
    const Spinner = this.context.getComponent('spinners.default');
    const Redirect = this.context.getComponent('routing.redirect');

    const { authenticated } = this.state;

    if (authenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div style={style}>
        <Spinner />
        <h4 className="mt-3">Loading</h4>
      </div>
    );
  }
}

export default AuthCallback;

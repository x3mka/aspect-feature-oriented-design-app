import React, { Component } from 'react';

class PrivateRoute extends Component {

  render() {
    const auth = this.context.getService('auth');
    const Route = this.context.getComponent('routing.types.public');
    const Redirect = this.context.getComponent('routing.redirect');

    const { component: RouteComponent, loginPath = '/login', ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => (
          auth.isAuthenticated() ? (
            <RouteComponent {...props} />
          ) : (
            <Redirect to={{
              pathname: loginPath,
              search: props.location.search,
              state: { from: props.location },
            }}
            />
          ))}
      />
    )
  }

}

export default PrivateRoute;

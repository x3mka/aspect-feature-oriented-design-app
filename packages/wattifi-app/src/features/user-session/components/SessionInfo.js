import React, {Component} from 'react';

class SessionInfo extends Component {

  render() {
    const auth = this.context.getService('auth');

    if (auth.isAuthenticated()) {
      const profile = auth.getProfile();
      const name = `${profile.nickname} (${profile.email})`;
      const picture = profile.picture;

      const Link = this.context.getComponent('routing.link');
      const SessionUserInfo = this.context.getComponentWithProps('session.userInfo', {
        link: Link,
        name,
        picture,
        logout: this.props.logout
      });
      return <SessionUserInfo />
    } else {
      const LoginButton = this.context.getComponentWithProps('session.loginButton', {login: this.props.login});
      return <LoginButton/>
    }

  }
}

export default SessionInfo;

import {Component} from 'react';

class LoginPage extends Component {

  render() {
      this.context.getService('auth').login();
      return null;
  }
}

export default LoginPage;

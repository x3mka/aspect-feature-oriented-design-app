import {Component} from 'react';

class LogoutPage extends Component {

  render() {
      this.context.getService('auth').logout();
      return null;
  }
}

export default LogoutPage;

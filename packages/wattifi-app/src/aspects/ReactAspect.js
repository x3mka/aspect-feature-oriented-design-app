import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const ReactAspect = (superclass) => class extends superclass {

  constructor(options = {}) {
    super(options);

    this.appContext = undefined;
  }

  getAppContext() {
    if (!this.appContext)
      this.appContext = React.createContext(this);;
    return this.appContext;
  }

  createRoot() {
    return class extends Component {
        render() {
          return <h1>Hello!</h1>;
        }
    }
  }

  start() {
    const Root = this.createRoot();
    ReactDOM.render(<Root/>, document.getElementById('root'));
  }

};

export default ReactAspect;

import React, {Component} from 'react';

class TestContext extends Component {

  render() {
    const app = this.context;
    return (
      <div>
        <h1>Test Context</h1>
        <div>App instance is passed as a context here. We can user any app API.</div>
        App registered components:<br/>
        <pre>{JSON.stringify(Object.keys(app.components).sort(), null, 2)}</pre>
        App registered services:<br/>
        <pre>{JSON.stringify(Object.keys(app.services).sort(), null, 2)}</pre>
      </div>
    )
  }

}

export default TestContext;

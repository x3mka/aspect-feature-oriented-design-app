import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { withProps } from 'recompose';


const defaultRouteType = 'public';

const RoutingAspect = (superclass) => class extends superclass {

  constructor(options = {}) {
    super(options);

    this.routes = [];

    this.registerComponent('routing.router', BrowserRouter);
    this.registerComponent('routing.switch', Switch);
    this.registerComponent('routing.link', Link);
    this.registerComponent('routing.redirect', Redirect);
    this.registerComponent(`routing.types.${defaultRouteType}`, Route);
  }

  addRoute({path, exact, component, type = defaultRouteType}) {
    this.routes.push({path, exact, component, type})
  }

  renderRoute(props) {
    const type = props.type;
    if (typeof props.component === 'string') {
      const Component = this.getComponent(props.component);
      if (!Component)
        throw new Error(`Route component ${props.component} is not registered`);
      props.component = Component;
    }

    const Route = this.getComponent(`routing.types.${type}`);
    if (!Route)
      throw new Error(`Component for route type '${type}' is not registered`);

    const RouteWithProps = withProps(props)(Route);
    return <RouteWithProps key={props.path}/>;
  }

  renderRouterFragment(predicate = (route) => true) {
    const routes = this.routes.filter(predicate);
    return () => (
      <React.Fragment>
        {routes.map(this.renderRoute.bind(this))}
      </React.Fragment>
    )
  }

  createRouter() {
    const Router = this.getComponent('routing.router');
    const Switch = this.getComponent('routing.switch');
    return (
      <Router>
        <Switch>
          {this.routes.map(this.renderRoute.bind(this))}
        </Switch>
      </Router>
    )
  }

};

export default RoutingAspect;

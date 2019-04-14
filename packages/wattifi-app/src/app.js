import React from 'react';
import mix from "./utils/mix";
import ReactAspect from "./aspects/ReactAspect";
import FeatureManagementAspect from "./aspects/FeatureManagementAspect";
import ComponentRegistryAspect from "./aspects/ComponentRegistryAspect";
import ServiceRegistryAspect from "./aspects/ServiceRegistryAspect";
import RoutingAspect from "./aspects/RoutingAspect";
import MenuItemsAspect from "./aspects/MenuItemsAspect";
import ApolloStateManagementAspect from "./aspects/ApolloStateManagementAspect";
import {
  ROUTE_AUTH_CALLBACK,
  ROUTE_DASHBOARD,
  ROUTE_LOGIN, ROUTE_LOGOUT,
} from "./constants/routes";



// some base functionality
class Application {}

// This is how we compose our app API using aspect mixins
// Aspect names are pretty self-explanatory
class MyApplication extends mix(Application).with(
  ReactAspect,
  ApolloStateManagementAspect,
  ComponentRegistryAspect,
  ServiceRegistryAspect,
  RoutingAspect,
  MenuItemsAspect,
  FeatureManagementAspect,
) {

  // override default implementation from React Aspect
  createRoot() {
    const Router = this.getComponent('routing.router');
    const Switch = this.getComponent('routing.switch');

    const Layout = this.getComponent('layouts.main');

    const Sidebar = this.getComponentWithProps('layouts.sidebar', {menuItems: this.getMenuItems()});

    const SessionInfo = this.getComponent('session.info');

    const AllRoutes = this.renderRouterFragment();
    const StateProvider = this.createStateProvider();

    const AppContext = this.getAppContext();

    return () => (
      <AppContext.Provider value={this}>
        <StateProvider>
          <Router>
            <Switch>
              <Layout Sidebar={Sidebar} Header={SessionInfo}>
                <AllRoutes />
              </Layout>
            </Switch>
          </Router>
        </StateProvider>
      </AppContext.Provider>
    )
  }

}

const app = new MyApplication();

// ========= Using App API directly ===================

// This could go in a 'dashboard' feature
app.registerComponent('pages.dashboard', () => <h1>Dashboard</h1>);
app.addRoute({path: ROUTE_DASHBOARD, component: 'pages.dashboard', exact: true});
app.addMenuItem({
  state: ROUTE_DASHBOARD,
  name: 'Dashboard (public)',
  icon: 'fa-home',
  isActive: (match) => (match.url === '/')
});

// ========= Using App API in features ================
// We can do better and consume app API by using features.
// One can use some config here to list all features needed.
// Any local feature can be extracted into a lerna local package or npm package

// example of a feature in a lerna package
// just dump components and styling
app.useFeature(require('wattifi-theme'));

// local state with apollo state link (no need for redux now, state link is really cool)
app.useFeature(require('./features/test-apollo-state'), {test: 'xxx'});

// test app provider context
// app instance is passed via context from AppContext.Provider
// consumers can reference this context and get any registered services, components needed
app.useFeature(require('./features/test-app-context'));

// auth0 authentication
app.useFeature(require('./features/auth0'), {
  auth0: {
    domain: 'wattifi-dev.auth0.com',
    clientID: '0SWdM1nlRS8kQRJBmiRZfUAW9pFuPMCF',
    redirectUri: `http://localhost:9000${ROUTE_AUTH_CALLBACK}`,
    audience: 'wattifi-api-dev'
  },
  accessTokenKey: 'wf_access_token',
  profileKey: 'wf_user_profile',
  logoutUrl: 'http://localhost:9000',
  callbackRoute: ROUTE_AUTH_CALLBACK,
  loginRoute: ROUTE_LOGIN,
  logoutRoute: ROUTE_LOGOUT
});

// user session ui (login button or user info with logout button)
app.useFeature(require('./features/user-session'), {login: ROUTE_LOGIN, logout: ROUTE_LOGOUT});


export default app;

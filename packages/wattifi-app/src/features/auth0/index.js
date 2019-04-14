import AuthService from "./AuthService";
import PrivateRoute from "./components/PrivateRoute";
import AuthCallback from "./components/AuthCallback";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";


const configure = (app, options = {}) => {

  app.registerService('auth', new AuthService(options));

  PrivateRoute.contextType = app.getAppContext();
  app.registerComponent(`routing.types.private`, PrivateRoute);

  AuthCallback.contextType = app.getAppContext();
  app.registerComponent(`auth.callback`, AuthCallback);

  LoginPage.contextType = app.getAppContext();
  app.registerComponent(`pages.login`, LoginPage);

  LogoutPage.contextType = app.getAppContext();
  app.registerComponent(`pages.logout`, LogoutPage);

  app.addRoute({path: options.callbackRoute, component: `auth.callback`});
  app.addRoute({path: options.loginRoute, component: 'pages.login'});
  app.addRoute({path: options.logoutRoute, component: 'pages.logout'});
};

export default {
  configure
}

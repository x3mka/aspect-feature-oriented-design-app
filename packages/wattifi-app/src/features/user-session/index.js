import SessionInfo from "./components/SessionInfo";
import LoginButton from "./components/LoginButton";


const configure = (app, options = {}) => {

  app.registerComponent(`session.loginButton`, LoginButton);

  SessionInfo.contextType = app.getAppContext();
  app.registerComponent(`session.info`, SessionInfo);

};

export default {
  configure
}

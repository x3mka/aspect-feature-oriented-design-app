import React from 'react';

import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout/Layout";
import UserSessionInfo from "./components/UserSessionInfo";
import Spinner from "./components/Spinner/Spinner";
import Portlet from "./components/Portlet";

import './assets/styles/main.scss';


const configure = (app, options = {}) => {
  app.registerComponent('layouts.main', Layout);
  app.registerComponent('layouts.sidebar', Sidebar);
  app.registerComponent('session.userInfo', UserSessionInfo);
  app.registerComponent('spinners.default', Spinner);
  app.registerComponent('boxes.portlet', Portlet);
};

export default {
  configure
}

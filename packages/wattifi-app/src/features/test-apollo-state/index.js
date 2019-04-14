import TestState from "./TestState";
import {ROUTE_TEST_STATE} from "../../constants/routes";

const configure = (app, options = {}) => {

  app.writeState(options);
  app.registerComponent('pages.testState', TestState);

  app.addRoute({path: ROUTE_TEST_STATE, component: 'pages.testState', type: 'private'});

  app.addMenuItem({
    state: ROUTE_TEST_STATE,
    name: 'Test State (private)',
    icon: 'fa-users',
    type: 'private'
  },);
};

export default {
  configure
}

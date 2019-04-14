import TestContext from "./TestContext";
import {ROUTE_TEST_CONTEXT} from "../../constants/routes";

const configure = (app, options = {}) => {

  TestContext.contextType = app.getAppContext();
  app.registerComponent('pages.testContext', TestContext);

  app.addRoute({path: ROUTE_TEST_CONTEXT, component: 'pages.testContext', type: 'private'});

  app.addMenuItem({
    state: ROUTE_TEST_CONTEXT,
    name: 'Test Context (private)',
    icon: 'fa-users',
    type: 'private'
  });
};

export default {
  configure
}

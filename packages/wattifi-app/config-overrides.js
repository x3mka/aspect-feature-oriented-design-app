const path = require ('path');
const fs = require ('fs');

const {
  override,
  addDecoratorsLegacy,
  babelInclude,
  disableEsLint,
} = require("customize-cra");

module.exports = function (config, env) {
  return Object.assign(config, override(
    //disableEsLint(),
    //addDecoratorsLegacy(),

    babelInclude([
      path.resolve('src'),
      fs.realpathSync('node_modules/wattifi-theme/src')
    ])
    )(config, env)
  )
};


const FeatureManagementAspect = (superclass) => class extends superclass {

  constructor(options = {}) {
    super(options);

    this.features = {}
  }

  useFeature(module, options = {}) {
    this.features[module.default.name] = {module: module.default, options};
    this.configureFeature(module.default.name);
  }

  configureFeature(name) {
    const f = this.features[name];
    if (f.module.configure)
       f.module.configure(this, f.options);
  }

  bootstrapFeature(name) {
    const f = this.features[name];
    if (f.module.bootstrap)
      f.module.bootstrap(this, f.options);
  }

  start() {
    Object.keys(this.features).forEach((name) => {
      this.bootstrapFeature(name)
    }, this);
    super.start();
  }

};

export default FeatureManagementAspect;
const ServiceRegistryAspect = (superclass) => class extends superclass {

  constructor(options = {}) {
    super(options);

    this.services = {};
  }

  registerService(key, s) {
    this.services[key] = s;
  }

  getService(key) {
    return this.services[key];
  }

};

export default ServiceRegistryAspect;

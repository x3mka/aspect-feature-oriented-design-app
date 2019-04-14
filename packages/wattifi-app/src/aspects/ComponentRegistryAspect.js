import React from 'react';

const ComponentRegistryAspect = (superclass) => class extends superclass {

  constructor(options = {}) {
    super(options);

    this.components = {};
  }

  registerComponent(key, c) {
    this.components[key] = c;
  }

  getComponent(key) {
    return this.components[key];
  }

  getComponentWithProps(key, props) {
    const Component = this.components[key];
    return (ownProps) => <Component {...ownProps} {...props} />
  }

};

export default ComponentRegistryAspect;

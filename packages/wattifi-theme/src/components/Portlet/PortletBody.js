import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: ''
};

const PortletBody = ({ className, children }) => (
  <div className={`Portlet__body ${className}`}>{children}</div>
);

PortletBody.propTypes = propTypes;
PortletBody.defaultProps = defaultProps;

export default PortletBody;

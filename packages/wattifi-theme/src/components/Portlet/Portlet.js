import React from 'react';

import PortletBody from './PortletBody';

const Portlet = ({ title, toolbar, children, bodyFit }) => {
  let bodyClasses = '';

  if (bodyFit) { bodyClasses += 'Portlet__body--fit' };

  return (
    <div className="Portlet">
      <div className="Portlet__header">
        <h3 className="Portlet__title">{title}</h3>

        <div className="Portlet__header-toolbar">{toolbar}</div>
      </div>

      <PortletBody className={bodyClasses}>{children}</PortletBody>
    </div>
  );
};

export default Portlet;

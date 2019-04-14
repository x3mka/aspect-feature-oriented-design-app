import React from 'react';

const Layout = ({ Sidebar, Header, children }) => {
  return (
    <div className="Layout">
      {Sidebar && <Sidebar/>}
      <div className="Main">
        <header className="Header">
          <div className="HeaderTopBar">
            {Header && <Header/>}
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;

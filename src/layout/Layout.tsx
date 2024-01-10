import React, { ReactNode } from 'react';
import DrawerMenu from './Drawer';
// import MainContent from './MainContent';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex h-screen'>
      <DrawerMenu />
      <div className='flex grow-1 h-min content-center'>
        {children}
      </div>
    </div>
  );
};

export default Layout;

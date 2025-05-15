import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const Layout = ({ children, sidebarCollapsed, toggleSidebar }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
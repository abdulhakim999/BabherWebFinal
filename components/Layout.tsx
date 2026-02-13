import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Header />
      {/* Key forces re-render on route change to trigger animation */}
      <main key={location.pathname} className="flex-grow animate-fade-in">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, BookOpen, Heart, Search, Moon, Sun } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'الرئيسية', path: '/' },
  { label: 'السيرة الذاتية', path: '/cv' },
  { label: 'الدروس', path: '/doros' },
  { label: 'المحاضرات', path: '/lectures' },
  { label: 'تواصل معنا', path: '/contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b-2 border-amber-600 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 space-x-reverse hover:opacity-90 transition-opacity">
              <div className="bg-amber-600 p-2 rounded-lg text-white shadow-sm">
                <BookOpen size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-white leading-none font-traditional">الشيخ محمد بابحر</span>
                <span className="text-sm text-amber-700 dark:text-amber-500">الموقع الرسمي لفضيلة الشيخ</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-2 space-x-reverse">
              <nav className="flex items-center space-x-1 space-x-reverse">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group flex items-center ${
                        isActive
                          ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 font-bold'
                          : 'text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.label}</span>
                        <span 
                          className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 transform origin-right transition-transform duration-300 ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        ></span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 mr-2">
                 {/* Favorites Link */}
                <Link 
                  to="/favorites"
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                  title="المفضلة"
                >
                  <Heart size={20} />
                </Link>

                {/* Theme Toggle */}
                <button 
                  onClick={toggleTheme}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full transition-colors"
                  title={theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {/* Search Button */}
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full transition-colors"
                  title="بحث"
                >
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="xl:hidden flex items-center space-x-2 space-x-reverse">
              <button 
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-amber-600"
                aria-label={theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}
                title={theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}
              >
                 {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
              </button>
              
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-amber-600"
                aria-label="بحث"
                title="بحث"
              >
                <Search size={24} />
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-amber-600 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`xl:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-inner">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 font-bold border-r-4 border-amber-600'
                      : 'text-gray-600 dark:text-gray-300 hover:text-amber-600 hover:bg-gray-50 dark:hover:bg-gray-800 border-r-4 border-transparent'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
             <NavLink
                to="/favorites"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold border-r-4 border-red-500'
                      : 'text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 border-r-4 border-transparent'
                  }`
                }
              >
                <Heart size={18} className="ml-3" /> المفضلة
              </NavLink>
          </div>
        </div>
      </header>

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
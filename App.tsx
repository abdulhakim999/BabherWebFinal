import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoader from './components/PageLoader';
import { FavoritesProvider } from './context/FavoritesContext';
import { AudioProvider } from './context/AudioContext';
import { ThemeProvider } from './context/ThemeContext';
import AudioPlayer from './components/AudioPlayer';

// Lazy-loaded pages for code splitting
const Home = React.lazy(() => import('./pages/Home'));
const CV = React.lazy(() => import('./pages/CV'));
const Doros = React.lazy(() => import('./pages/Doros'));
const Lectures = React.lazy(() => import('./pages/Lectures'));
const Speech = React.lazy(() => import('./pages/Speech'));
const Visuals = React.lazy(() => import('./pages/Visuals'));
const Books = React.lazy(() => import('./pages/Books'));
const Articles = React.lazy(() => import('./pages/Articles'));
const News = React.lazy(() => import('./pages/News'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Favorites = React.lazy(() => import('./pages/Favorites'));
const ContentDetails = React.lazy(() => import('./pages/ContentDetails'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <FavoritesProvider>
          <AudioProvider>
            <Router>
              <ScrollToTop />
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cv" element={<CV />} />
                    <Route path="/doros" element={<Doros />} />
                    <Route path="/lectures" element={<Lectures />} />
                    <Route path="/speech" element={<Speech />} />
                    <Route path="/visuals" element={<Visuals />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/content/:id" element={<ContentDetails />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <AudioPlayer />
              </Layout>
            </Router>
          </AudioProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
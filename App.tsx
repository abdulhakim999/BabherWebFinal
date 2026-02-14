import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CV from './pages/CV';
import Doros from './pages/Doros';
import Lectures from './pages/Lectures';
import Speech from './pages/Speech';
import Visuals from './pages/Visuals';
import Books from './pages/Books';
import Articles from './pages/Articles';
import News from './pages/News';
import Contact from './pages/Contact';
import Favorites from './pages/Favorites';
import ContentDetails from './pages/ContentDetails';
import NotFound from './pages/NotFound';
import { FavoritesProvider } from './context/FavoritesContext';
import { AudioProvider } from './context/AudioContext';
import { ThemeProvider } from './context/ThemeContext';
import AudioPlayer from './components/AudioPlayer';

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
    <ThemeProvider>
      <FavoritesProvider>
        <AudioProvider>
          <Router>
            <ScrollToTop />
            <Layout>
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
              <AudioPlayer />
            </Layout>
          </Router>
        </AudioProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
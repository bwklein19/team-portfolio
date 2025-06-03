import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/globals.css';

import theme from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh',
          background: `
            radial-gradient(at 80% 0%, rgba(43, 88, 118, 0.04) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgba(78, 67, 118, 0.04) 0px, transparent 50%),
            radial-gradient(at 80% 100%, rgba(255, 107, 107, 0.04) 0px, transparent 50%)
          `,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

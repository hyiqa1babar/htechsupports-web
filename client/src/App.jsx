// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header  from './components/Header.jsx';
import Footer  from './components/Footer.jsx';
import Home    from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Contact  from './pages/Contact.jsx';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact"  element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;

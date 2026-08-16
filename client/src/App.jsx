// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Login from './pages/Login.jsx';
import SimpleAdmin from './pages/SimpleAdmin.jsx';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { PartnerProvider } from './components/PartnerContext.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import SectorsRedesign from './pages/SectorsRedesign.jsx';
import Company from './pages/Company.jsx';
import Resources from './pages/Resources.jsx';
import Careers from './pages/Careers.jsx';
import Engineer from './pages/Engineer.jsx';
import Blog from './pages/Blog.jsx';
import DetailPage from './pages/DetailPage.jsx';
import ResourceDetail from './pages/ResourceDetail.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';

function App() {
  return (
    <HelmetProvider>
      <PartnerProvider>
        <AuthProvider>
          <Router>
            <Header />
            <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<DetailPage />} />
              <Route path="/sectors" element={<SectorsRedesign />} />
              <Route path="/sectors/:id" element={<DetailPage />} />

              <Route path="/pages/services" element={<Navigate to="/services" replace />} />
              <Route path="/pages/services/:id" element={<Navigate to="/services/:id" replace />} />
              <Route path="/pages/sectors" element={<Navigate to="/sectors" replace />} />
              <Route path="/pages/sectors/:id" element={<Navigate to="/sectors/:id" replace />} />
              <Route path="/pages/company" element={<Navigate to="/company" replace />} />
              <Route path="/pages/careers" element={<Navigate to="/careers" replace />} />
              <Route path="/pages/engineer" element={<Navigate to="/engineer" replace />} />
              <Route path="/pages/contact-creative" element={<Navigate to="/contact" replace />} />
              <Route path="/pages/terms-and-conditions" element={<Navigate to="/terms-and-conditions" replace />} />
              <Route path="/pages/privacy-policy" element={<Navigate to="/privacy-policy" replace />} />

              <Route path="/company" element={<Company />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:slug" element={<ResourceDetail />} />
              <Route path="/blog/:slug" element={<ResourceDetail />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/engineer" element={<Engineer />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<SimpleAdmin />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms-and-conditions" element={<Terms />} />
              <Route path="/privacy-policy" element={<Privacy />} />

              {['professional-service','wireless-survey','network-support','structured-cabling',
                'end-user-computing-support','itad-it-asset-disposal','staff-augmentation',
                'retail','enterprise','data-center','carrier-network','manufacturing','government'].map(slug => (
                <Route key={slug} path={`/pages/${slug}`} element={<DetailPage slug={slug} />} />
              ))}
            </Routes>
          </main>
          <Footer />
          </Router>
        <AuthProvider>
      </PartnerProvider>
    </HelmetProvider>
  );
}

export default App;

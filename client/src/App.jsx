import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import './i18n'; // Initialize i18n
import './styles/accessibility.css'; // Import accessibility styles
import Navbar from './components/layout/Navbar';
import BackgroundDecorations from './components/layout/BackgroundDecorations';
import AccessibilityToolbar from './components/accessibility/AccessibilityToolbar';
import SkipToContent from './components/accessibility/SkipToContent';
import KeyboardShortcuts from './components/accessibility/KeyboardShortcuts';
import AccessibilityNotification from './components/accessibility/AccessibilityNotification';
import Home from './pages/Home';
import About from './pages/About';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FamilyTree from './pages/FamilyTree';
import News from './pages/News';
import Events from './pages/Events';
import Profile from './pages/Profile';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
          <div className="min-h-screen bg-white relative">
            {/* Skip to content link for keyboard navigation */}
            <SkipToContent />
            <KeyboardShortcuts />
            <BackgroundDecorations />
            <Navbar />
            <AccessibilityToolbar />
            <AccessibilityNotification />
          <Routes>
            <Route path="/" element={<div id="main-content"><Home /></div>} />
            <Route path="/about" element={
              <main id="main-content" className="container mx-auto px-4 pt-28 pb-8 relative z-10">
                <About />
              </main>
            } />
            <Route path="/history" element={
              <main id="main-content" className="container mx-auto px-4 pt-28 pb-8 relative z-10">
                <History />
              </main>
            } />
            <Route path="/news" element={
              <main id="main-content" className="container mx-auto px-4 pt-28 pb-8 relative z-10">
                <News />
              </main>
            } />
            <Route path="/events" element={
              <main id="main-content" className="container mx-auto px-4 pt-28 pb-8 relative z-10">
                <Events />
              </main>
            } />
            <Route path="/login" element={
              <main id="main-content" className="container mx-auto px-4 pt-28 pb-8 relative z-10">
                <Login />
              </main>
            } />
            <Route path="/register" element={
              <main id="main-content" className="container mx-auto px-4 pt-28 pb-8 relative z-10">
                <Register />
              </main>
            } />
            <Route path="/dashboard" element={
              <main id="main-content" className="container mx-auto px-4 pt-28 pb-8 relative z-10">
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              </main>
            } />
            <Route path="/family-tree" element={
              <main id="main-content" className="container mx-auto px-4 pt-28 pb-8 relative z-10">
                <PrivateRoute>
                  <FamilyTree />
                </PrivateRoute>
              </main>
            } />
            <Route path="/profile" element={
              <main id="main-content" className="container mx-auto px-4 pt-28 pb-8 relative z-10">
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              </main>
            } />
          </Routes>
        </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  </AccessibilityProvider>
  );
}

export default App;
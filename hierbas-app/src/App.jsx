import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import WelcomePage from "./components/WelcomePage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import AuthModal from "./components/AuthModal";
import { useState, useEffect } from "react";

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Show auth modal on every page visit if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Cargando...
      </div>
    );
  }

  return (
    <>
      <Header />
      <div style={{ paddingTop: isAuthenticated ? '80px' : '0' }}>
        {isAuthenticated ? <Dashboard /> : <WelcomePage />}
      </div>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Registro from './components/Registro';
import ListaHierbas from './components/ListaHierbas';
import RegistroHierba from './components/RegistroHierba';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setLoading(false);
  }, []);

  const manejarLogin = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
  };

  const manejarLogout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar bg="success" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="#home">
              🌿 Sistema de Registro de Hierbas
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {usuario && (
                  <>
                    <Nav.Link href="/hierbas">Ver Hierbas</Nav.Link>
                    <Nav.Link href="/registrar-hierba">Registrar Hierba</Nav.Link>
                  </>
                )}
              </Nav>
              <Nav>
                {usuario ? (
                  <div className="d-flex align-items-center">
                    <span className="text-light me-3">
                      Hola, {usuario.nombre} {usuario.apellido}
                    </span>
                    <Button variant="outline-light" onClick={manejarLogout}>
                      Cerrar Sesión
                    </Button>
                  </div>
                ) : (
                  <>
                    <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
                    <Nav.Link href="/registro">Registrarse</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <Routes>
            <Route 
              path="/" 
              element={usuario ? <Navigate to="/hierbas" /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!usuario ? <Login onLogin={manejarLogin} /> : <Navigate to="/hierbas" />} 
            />
            <Route 
              path="/registro" 
              element={!usuario ? <Registro onLogin={manejarLogin} /> : <Navigate to="/hierbas" />} 
            />
            <Route 
              path="/hierbas" 
              element={usuario ? <ListaHierbas usuario={usuario} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/registrar-hierba" 
              element={usuario ? <RegistroHierba usuario={usuario} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;

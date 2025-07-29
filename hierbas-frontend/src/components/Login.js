import React, { useState } from 'react';
import { Card, Form, Button, Alert, Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usuarioService } from '../services/api';

const Login = ({ onLogin }) => {
  const [credenciales, setCredenciales] = useState({
    email: '',
    password: ''
  });
  const [emailRapido, setEmailRapido] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarCambio = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value
    });
  };

  const manejarSubmitLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const usuario = await usuarioService.login(credenciales);
      onLogin(usuario);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  const manejarSubmitEmailRapido = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const usuario = await usuarioService.loginSoloEmail(emailRapido);
      onLogin(usuario);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow">
            <Card.Header as="h4" className="text-center bg-success text-white">
              🌿 Iniciar Sesión
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Tabs defaultActiveKey="login-completo" id="login-tabs" className="mb-3">
                <Tab eventKey="login-completo" title="Login Completo">
                  <Form onSubmit={manejarSubmitLogin}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={credenciales.email}
                        onChange={manejarCambio}
                        required
                        placeholder="ejemplo@correo.com"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={credenciales.password}
                        onChange={manejarCambio}
                        required
                        placeholder="Tu contraseña"
                      />
                    </Form.Group>

                    <Button 
                      variant="success" 
                      type="submit" 
                      className="w-100 mb-3"
                      disabled={cargando}
                    >
                      {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </Button>
                  </Form>
                </Tab>

                <Tab eventKey="login-rapido" title="Login Rápido">
                  <Form onSubmit={manejarSubmitEmailRapido}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={emailRapido}
                        onChange={(e) => setEmailRapido(e.target.value)}
                        required
                        placeholder="ejemplo@correo.com"
                      />
                      <Form.Text className="text-muted">
                        Ingresa solo con tu email registrado
                      </Form.Text>
                    </Form.Group>

                    <Button 
                      variant="info" 
                      type="submit" 
                      className="w-100 mb-3"
                      disabled={cargando}
                    >
                      {cargando ? 'Iniciando sesión...' : 'Acceso Rápido'}
                    </Button>
                  </Form>
                </Tab>
              </Tabs>

              <div className="text-center">
                <p className="mb-0">
                  ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                </p>
              </div>

              <hr />
              <div className="text-center">
                <small className="text-muted">
                  Usuarios de prueba:<br />
                  • admin@hierbas.com / admin123<br />
                  • usuario@test.com / test123
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
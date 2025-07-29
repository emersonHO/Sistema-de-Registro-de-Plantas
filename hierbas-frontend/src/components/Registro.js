import React, { useState } from 'react';
import { Card, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usuarioService } from '../services/api';

const Registro = ({ onLogin }) => {
  const [datosUsuario, setDatosUsuario] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: ''
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarCambio = (e) => {
    setDatosUsuario({
      ...datosUsuario,
      [e.target.name]: e.target.value
    });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const usuario = await usuarioService.registrar(datosUsuario);
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
              🌿 Crear Cuenta
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={manejarSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={datosUsuario.nombre}
                    onChange={manejarCambio}
                    required
                    placeholder="Tu nombre"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellido"
                    value={datosUsuario.apellido}
                    onChange={manejarCambio}
                    required
                    placeholder="Tu apellido"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={datosUsuario.email}
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
                    value={datosUsuario.password}
                    onChange={manejarCambio}
                    required
                    placeholder="Tu contraseña"
                    minLength="6"
                  />
                  <Form.Text className="text-muted">
                    La contraseña debe tener al menos 6 caracteres.
                  </Form.Text>
                </Form.Group>

                <Button 
                  variant="success" 
                  type="submit" 
                  className="w-100 mb-3"
                  disabled={cargando}
                >
                  {cargando ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
              </Form>

              <div className="text-center">
                <p className="mb-0">
                  ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;
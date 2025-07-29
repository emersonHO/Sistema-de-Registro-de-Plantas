import React, { useState } from 'react';
import { Card, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { hierbaService } from '../services/api';

const RegistroHierba = ({ usuario }) => {
  const navigate = useNavigate();
  const [datosHierba, setDatosHierba] = useState({
    nombre: '',
    nombreCientifico: '',
    descripcion: '',
    propiedadesMedicinales: '',
    habitatNatural: '',
    formaUso: '',
    precauciones: '',
    categoria: '',
    origen: '',
    usuarioId: usuario.id
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const categorias = ['Medicinal', 'Aromática', 'Culinaria', 'Ornamental', 'Silvestre'];

  const manejarCambio = (e) => {
    setDatosHierba({
      ...datosHierba,
      [e.target.name]: e.target.value
    });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    setExito('');

    try {
      await hierbaService.registrar(datosHierba);
      setExito('¡Hierba registrada exitosamente!');
      
      // Limpiar formulario
      setDatosHierba({
        nombre: '',
        nombreCientifico: '',
        descripcion: '',
        propiedadesMedicinales: '',
        habitatNatural: '',
        formaUso: '',
        precauciones: '',
        categoria: '',
        origen: '',
        usuarioId: usuario.id
      });

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/hierbas');
      }, 2000);

    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🌱 Registrar Nueva Hierba</h2>
        <Button variant="outline-secondary" onClick={() => navigate('/hierbas')}>
          ← Volver al Catálogo
        </Button>
      </div>

      <Card className="shadow">
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {exito && <Alert variant="success">{exito}</Alert>}
          
          <Form onSubmit={manejarSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la Hierba *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={datosHierba.nombre}
                    onChange={manejarCambio}
                    required
                    placeholder="Ej: Manzanilla"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre Científico</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombreCientifico"
                    value={datosHierba.nombreCientifico}
                    onChange={manejarCambio}
                    placeholder="Ej: Chamaemelum nobile"
                  />
                  <Form.Text className="text-muted">
                    Opcional. Nombre científico en latín.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Categoría *</Form.Label>
                  <Form.Select
                    name="categoria"
                    value={datosHierba.categoria}
                    onChange={manejarCambio}
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map(categoria => (
                      <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Origen</Form.Label>
                  <Form.Control
                    type="text"
                    name="origen"
                    value={datosHierba.origen}
                    onChange={manejarCambio}
                    placeholder="Ej: Europa, América del Sur, Asia"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Hábitat Natural</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="habitatNatural"
                    value={datosHierba.habitatNatural}
                    onChange={manejarCambio}
                    placeholder="Describe dónde crece naturalmente esta hierba..."
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={datosHierba.descripcion}
                    onChange={manejarCambio}
                    required
                    placeholder="Describe la apariencia y características de la hierba..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Propiedades Medicinales</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="propiedadesMedicinales"
                    value={datosHierba.propiedadesMedicinales}
                    onChange={manejarCambio}
                    placeholder="Ej: Antiinflamatoria, relajante, digestiva..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Forma de Uso</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="formaUso"
                    value={datosHierba.formaUso}
                    onChange={manejarCambio}
                    placeholder="Ej: Infusión, aceite esencial, aplicación tópica..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Precauciones</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="precauciones"
                    value={datosHierba.precauciones}
                    onChange={manejarCambio}
                    placeholder="Contraindicaciones, efectos secundarios, advertencias..."
                  />
                  <Form.Text className="text-muted">
                    Importante: Menciona cualquier precaución o contraindicación.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <hr />
            
            <div className="text-center">
              <Button 
                variant="success" 
                type="submit" 
                className="px-5"
                disabled={cargando}
              >
                {cargando ? 'Registrando...' : 'Registrar Hierba'}
              </Button>
              <Button 
                variant="outline-secondary" 
                className="ms-3"
                onClick={() => navigate('/hierbas')}
                disabled={cargando}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mt-4 bg-light">
        <Card.Body>
          <h6>💡 Consejos para registrar hierbas:</h6>
          <ul className="mb-0">
            <li>Sé lo más descriptivo posible en la descripción</li>
            <li>Incluye el nombre científico si lo conoces</li>
            <li>Menciona todas las precauciones importantes</li>
            <li>Describe claramente las formas de uso</li>
            <li>Categoriza correctamente para facilitar la búsqueda</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegistroHierba;
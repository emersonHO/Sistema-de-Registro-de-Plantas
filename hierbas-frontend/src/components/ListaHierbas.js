import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form, InputGroup, Alert, Badge, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { hierbaService } from '../services/api';

const ListaHierbas = ({ usuario }) => {
  const [hierbas, setHierbas] = useState([]);
  const [hierbasOriginales, setHierbasOriginales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroUsuario, setFiltroUsuario] = useState('todos');
  const [mostrarDetalles, setMostrarDetalles] = useState(null);

  const categorias = ['Medicinal', 'Aromática', 'Culinaria', 'Ornamental', 'Silvestre'];

  useEffect(() => {
    cargarHierbas();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [busqueda, filtroCategoria, filtroUsuario, hierbasOriginales]);

  const cargarHierbas = async () => {
    try {
      setCargando(true);
      const datos = await hierbaService.listarTodas();
      setHierbas(datos);
      setHierbasOriginales(datos);
      setError('');
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  const aplicarFiltros = () => {
    let hierbasFiltradas = [...hierbasOriginales];

    // Filtro por búsqueda
    if (busqueda.trim()) {
      hierbasFiltradas = hierbasFiltradas.filter(hierba =>
        hierba.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        hierba.nombreCientifico?.toLowerCase().includes(busqueda.toLowerCase()) ||
        hierba.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtro por categoría
    if (filtroCategoria !== 'todas') {
      hierbasFiltradas = hierbasFiltradas.filter(hierba =>
        hierba.categoria === filtroCategoria
      );
    }

    // Filtro por usuario
    if (filtroUsuario === 'mis-hierbas') {
      hierbasFiltradas = hierbasFiltradas.filter(hierba =>
        hierba.usuarioId === usuario.id
      );
    }

    setHierbas(hierbasFiltradas);
  };

  const eliminarHierba = async (hierbaId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta hierba?')) {
      try {
        await hierbaService.eliminar(hierbaId);
        await cargarHierbas();
      } catch (error) {
        setError('Error al eliminar la hierba');
      }
    }
  };

  const obtenerColorCategoria = (categoria) => {
    const colores = {
      'Medicinal': 'danger',
      'Aromática': 'info',
      'Culinaria': 'warning',
      'Ornamental': 'success',
      'Silvestre': 'secondary'
    };
    return colores[categoria] || 'primary';
  };

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando hierbas...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🌿 Catálogo de Hierbas</h2>
        <Link to="/registrar-hierba">
          <Button variant="success">+ Registrar Nueva Hierba</Button>
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Filtros */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Buscar</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Nombre, nombre científico o descripción..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                  {busqueda && (
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setBusqueda('')}
                    >
                      ✕
                    </Button>
                  )}
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                >
                  <option value="todas">Todas las categorías</option>
                  {categorias.map(categoria => (
                    <option key={categoria} value={categoria}>{categoria}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Filtrar por usuario</Form.Label>
                <Form.Select
                  value={filtroUsuario}
                  onChange={(e) => setFiltroUsuario(e.target.value)}
                >
                  <option value="todos">Todas las hierbas</option>
                  <option value="mis-hierbas">Mis hierbas</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Resultados */}
      <div className="mb-3">
        <span className="text-muted">
          Mostrando {hierbas.length} de {hierbasOriginales.length} hierbas
        </span>
      </div>

      {hierbas.length === 0 ? (
        <Alert variant="info" className="text-center">
          <h5>No se encontraron hierbas</h5>
          <p>Intenta cambiar los filtros o <Link to="/registrar-hierba">registra la primera hierba</Link></p>
        </Alert>
      ) : (
        <Row>
          {hierbas.map(hierba => (
            <Col md={6} lg={4} key={hierba.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <Badge bg={obtenerColorCategoria(hierba.categoria)}>
                    {hierba.categoria}
                  </Badge>
                  {hierba.usuarioId === usuario.id && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => eliminarHierba(hierba.id)}
                    >
                      🗑️
                    </Button>
                  )}
                </Card.Header>
                <Card.Body>
                  <Card.Title className="text-success">{hierba.nombre}</Card.Title>
                  {hierba.nombreCientifico && (
                    <Card.Subtitle className="mb-2 text-muted fst-italic">
                      {hierba.nombreCientifico}
                    </Card.Subtitle>
                  )}
                  <Card.Text>
                    {hierba.descripcion?.substring(0, 100)}
                    {hierba.descripcion?.length > 100 && '...'}
                  </Card.Text>
                  {hierba.propiedadesMedicinales && (
                    <div className="mb-2">
                      <small className="text-muted">
                        <strong>Propiedades:</strong> {hierba.propiedadesMedicinales.substring(0, 80)}
                        {hierba.propiedadesMedicinales.length > 80 && '...'}
                      </small>
                    </div>
                  )}
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      Por: {hierba.nombreUsuario}
                    </small>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => setMostrarDetalles(hierba)}
                    >
                      Ver Detalles
                    </Button>
                  </div>
                  <small className="text-muted d-block mt-1">
                    Registrada: {new Date(hierba.fechaRegistro).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal de detalles */}
      <Modal show={mostrarDetalles !== null} onHide={() => setMostrarDetalles(null)} size="lg">
        {mostrarDetalles && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {mostrarDetalles.nombre}
                {mostrarDetalles.nombreCientifico && (
                  <small className="text-muted d-block fst-italic">
                    {mostrarDetalles.nombreCientifico}
                  </small>
                )}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <h6>Descripción</h6>
                  <p>{mostrarDetalles.descripcion}</p>
                  
                  <h6>Propiedades Medicinales</h6>
                  <p>{mostrarDetalles.propiedadesMedicinales}</p>
                  
                  <h6>Forma de Uso</h6>
                  <p>{mostrarDetalles.formaUso}</p>
                </Col>
                <Col md={6}>
                  <h6>Hábitat Natural</h6>
                  <p>{mostrarDetalles.habitatNatural}</p>
                  
                  <h6>Origen</h6>
                  <p>{mostrarDetalles.origen}</p>
                  
                  <h6>Precauciones</h6>
                  <p className="text-warning">{mostrarDetalles.precauciones}</p>
                  
                  <div className="mt-3">
                    <Badge bg={obtenerColorCategoria(mostrarDetalles.categoria)} className="me-2">
                      {mostrarDetalles.categoria}
                    </Badge>
                    <small className="text-muted">
                      Registrada por {mostrarDetalles.nombreUsuario}
                    </small>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setMostrarDetalles(null)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ListaHierbas;
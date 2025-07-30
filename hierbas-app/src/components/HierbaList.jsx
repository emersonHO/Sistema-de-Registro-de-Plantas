import { useEffect, useState } from "react";
import { getHierbas, deleteHierba } from "../services/HierbaService";
import { updateHierba } from "../services/HierbaService";

export default function HierbaList() {
  const [hierbas, setHierbas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ nombre: "", uso: "", origen: "", propiedades: "" });


  const cargar = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getHierbas();
      setHierbas(res.data);
    } catch (err) {
      setError("Error al cargar las hierbas");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta hierba?")) return;
    setLoading(true);
    try {
      await deleteHierba(id);
      await cargar();
    } catch (err) {
      setError("Error al eliminar la hierba");
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicion = (h) => {
    setEditId(h.id);
    setEditData({ nombre: h.nombre, uso: h.uso, origen: h.origen, propiedades: h.propiedades });
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setEditData({ nombre: "", uso: "", origen: "", propiedades: "" });
  };

  const guardarEdicion = async (id) => {
    setLoading(true);
    setError("");
    try {
      await updateHierba(id, editData);
      setEditId(null);
      await cargar();
    } catch (err) {
      setError("Error al editar la hierba");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  if (loading) return (
    <div style={{ 
      textAlign: "center", 
      padding: "40px",
      color: '#666',
      fontSize: '16px'
    }}>
      Cargando hierbas...
    </div>
  );
  
  if (error) return (
    <div style={{ 
      color: "#d32f2f", 
      textAlign: "center", 
      padding: "20px",
      background: '#ffebee',
      borderRadius: '8px',
      border: '1px solid #ffcdd2'
    }}>
      {error}
    </div>
  );

  return (
    <div>
      <h3 style={{ 
        margin: '0 0 20px 0', 
        color: '#333',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Hierbas Registradas ({hierbas.length})
      </h3>
      
      {hierbas.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#666",
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌿</div>
          <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>No hay hierbas registradas</h4>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Comienza agregando tu primera hierba medicinal
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {hierbas.map((h) => (
            <div key={h.id} style={{
              background: "white",
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #f0f0f0'
            }}>
              {editId === h.id ? (
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input 
                      value={editData.nombre} 
                      onChange={e => setEditData({ ...editData, nombre: e.target.value })} 
                      placeholder="Nombre"
                      style={{ 
                        padding: '12px 16px', 
                        borderRadius: '8px', 
                        border: "1px solid #e1e5e9",
                        fontSize: '14px'
                      }}
                    />
                    <input 
                      value={editData.uso} 
                      onChange={e => setEditData({ ...editData, uso: e.target.value })} 
                      placeholder="Uso"
                      style={{ 
                        padding: '12px 16px', 
                        borderRadius: '8px', 
                        border: "1px solid #e1e5e9",
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input 
                      value={editData.origen} 
                      onChange={e => setEditData({ ...editData, origen: e.target.value })} 
                      placeholder="Origen"
                      style={{ 
                        padding: '12px 16px', 
                        borderRadius: '8px', 
                        border: "1px solid #e1e5e9",
                        fontSize: '14px'
                      }}
                    />
                    <input 
                      value={editData.propiedades} 
                      onChange={e => setEditData({ ...editData, propiedades: e.target.value })} 
                      placeholder="Propiedades"
                      style={{ 
                        padding: '12px 16px', 
                        borderRadius: '8px', 
                        border: "1px solid #e1e5e9",
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={cancelarEdicion} 
                      style={{ 
                        background: "#6c757d", 
                        color: "white", 
                        border: "none", 
                        borderRadius: '8px', 
                        padding: "10px 20px", 
                        cursor: "pointer",
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={() => guardarEdicion(h.id)} 
                      style={{ 
                        background: "#667eea", 
                        color: "white", 
                        border: "none", 
                        borderRadius: '8px', 
                        padding: "10px 20px", 
                        cursor: "pointer",
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 12px 0', 
                      color: '#333',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>
                      {h.nombre}
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                      <div>
                        <strong style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase' }}>Uso:</strong>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>{h.uso}</p>
                      </div>
                      <div>
                        <strong style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase' }}>Origen:</strong>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>{h.origen}</p>
                      </div>
                      <div>
                        <strong style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase' }}>Propiedades:</strong>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>{h.propiedades}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                    <button 
                      onClick={() => iniciarEdicion(h)} 
                      style={{ 
                        background: "#ffa726", 
                        color: "white", 
                        border: "none", 
                        borderRadius: '6px', 
                        padding: "8px 16px", 
                        cursor: "pointer",
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => eliminar(h.id)} 
                      style={{ 
                        background: "#d32f2f", 
                        color: "white", 
                        border: "none", 
                        borderRadius: '6px', 
                        padding: "8px 16px", 
                        cursor: "pointer",
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
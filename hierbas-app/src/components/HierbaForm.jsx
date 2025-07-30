import { useState } from "react";
import { addHierba } from "../services/HierbaService";

export default function HierbaForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [uso, setUso] = useState("");
  const [origen, setOrigen] = useState("");
  const [propiedades, setPropiedades] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !uso || !origen || !propiedades) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      const nuevaHierba = { nombre, uso, origen, propiedades };
      const res = await addHierba(nuevaHierba);
      onAdd(res.data); // actualizar lista
      setNombre("");
      setUso("");
      setOrigen("");
      setPropiedades("");
      setSuccess("Hierba registrada exitosamente");
    } catch (err) {
      setError("Error al registrar la hierba");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    }}>
      <h3 style={{ 
        margin: '0 0 20px 0', 
        color: '#333',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Agregar Nueva Hierba
      </h3>
      
      <form onSubmit={handleSubmit} style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px" 
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <input 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Nombre de la hierba" 
            required 
            style={{ 
              padding: '12px 16px', 
              borderRadius: '8px', 
              border: "1px solid #e1e5e9",
              fontSize: '14px',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
          />
          <input 
            value={uso} 
            onChange={(e) => setUso(e.target.value)} 
            placeholder="Uso medicinal" 
            required 
            style={{ 
              padding: '12px 16px', 
              borderRadius: '8px', 
              border: "1px solid #e1e5e9",
              fontSize: '14px',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <input 
            value={origen} 
            onChange={(e) => setOrigen(e.target.value)} 
            placeholder="Origen geográfico" 
            required 
            style={{ 
              padding: '12px 16px', 
              borderRadius: '8px', 
              border: "1px solid #e1e5e9",
              fontSize: '14px',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
          />
          <input 
            value={propiedades} 
            onChange={(e) => setPropiedades(e.target.value)} 
            placeholder="Propiedades medicinales" 
            required 
            style={{ 
              padding: '12px 16px', 
              borderRadius: '8px', 
              border: "1px solid #e1e5e9",
              fontSize: '14px',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading} 
          style={{ 
            padding: '14px 24px', 
            borderRadius: '8px', 
            background: "#667eea", 
            color: "white", 
            border: "none", 
            fontWeight: "600", 
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: '14px',
            transition: 'all 0.2s ease',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Registrando..." : "Agregar Hierba"}
        </button>
        
        {error && (
          <div style={{ 
            color: "#d32f2f", 
            fontSize: '14px',
            padding: '12px',
            background: '#ffebee',
            borderRadius: '6px',
            border: '1px solid #ffcdd2'
          }}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={{ 
            color: "#388e3c", 
            fontSize: '14px',
            padding: '12px',
            background: '#e8f5e8',
            borderRadius: '6px',
            border: '1px solid #c8e6c9'
          }}>
            {success}
          </div>
        )}
      </form>
    </div>
  );
}
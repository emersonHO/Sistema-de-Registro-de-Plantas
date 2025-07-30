import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (err) {
      setError(isRegister ? "Error al registrarse" : "Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = '#f0f0f0'}
          onMouseLeave={(e) => e.target.style.background = 'none'}
        >
          ×
        </button>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '24px', 
            fontWeight: '600',
            color: '#333'
          }}>
            Bienvenido
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#666', 
            fontSize: '14px' 
          }}>
            {isRegister ? 'Crea tu cuenta para continuar' : 'Inicia sesión para continuar'}
          </p>
        </div>

        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          marginBottom: "24px",
          background: '#f8f9fa',
          borderRadius: '8px',
          padding: '4px'
        }}>
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '6px',
              border: 'none',
              background: !isRegister ? '#667eea' : 'transparent',
              color: !isRegister ? '#fff' : '#666',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '14px'
            }}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '6px',
              border: 'none',
              background: isRegister ? '#667eea' : 'transparent',
              color: isRegister ? '#fff' : '#666',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '14px'
            }}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "16px" 
        }}>
          <div>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Correo electrónico" 
              type="email" 
              required 
              style={{ 
                width: '100%',
                padding: '12px 16px', 
                borderRadius: '8px', 
                border: '1px solid #e1e5e9',
                fontSize: '14px',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
            />
          </div>
          <div>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Contraseña" 
              type="password" 
              required 
              style={{ 
                width: '100%',
                padding: '12px 16px', 
                borderRadius: '8px', 
                border: '1px solid #e1e5e9',
                fontSize: '14px',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: '100%',
              padding: '14px 16px', 
              borderRadius: '8px', 
              background: '#667eea', 
              color: "white", 
              border: "none", 
              fontWeight: "600", 
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: '14px',
              transition: 'all 0.2s ease',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? (isRegister ? "Registrando..." : "Ingresando...") : (isRegister ? "Registrarse" : "Iniciar sesión")}
          </button>
          {error && (
            <div style={{ 
              color: "#d32f2f", 
              fontSize: '14px',
              textAlign: 'center',
              padding: '8px',
              background: '#ffebee',
              borderRadius: '6px',
              border: '1px solid #ffcdd2'
            }}>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
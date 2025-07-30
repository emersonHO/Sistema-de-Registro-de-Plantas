export default function WelcomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        maxWidth: '600px'
      }}>
        <div style={{
          fontSize: '64px',
          marginBottom: '24px',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
        }}>
          🌿
        </div>
        
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '16px',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Hierbas App
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          marginBottom: '32px',
          opacity: 0.9,
          lineHeight: 1.6,
          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }}>
          Gestiona tu colección de hierbas medicinales de manera fácil y organizada
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginTop: '40px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '24px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📝</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Registro Fácil</h3>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
              Agrega hierbas con toda su información medicinal
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '24px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Búsqueda Rápida</h3>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
              Encuentra hierbas por nombre, uso o propiedades
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '24px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>💾</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Almacenamiento Seguro</h3>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
              Tus datos están protegidos y sincronizados
            </p>
          </div>
        </div>
        
        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <p style={{
            margin: '0 0 16px 0',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Inicia sesión o regístrate para comenzar
          </p>
          <p style={{
            margin: 0,
            fontSize: '14px',
            opacity: 0.8
          }}>
            El modal de autenticación aparecerá automáticamente
          </p>
        </div>
      </div>
    </div>
  );
}
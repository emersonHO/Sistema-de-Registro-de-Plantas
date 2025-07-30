import HierbaForm from "../components/HierbaForm";
import HierbaList from "../components/HierbaList";

export default function Dashboard() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '32px',
          textAlign: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>
            Gestión de Hierbas
          </h1>
          <p style={{ margin: '8px 0 0 0', opacity: 0.9 }}>
            Administra tu colección de hierbas medicinales
          </p>
        </div>
        
        <div style={{ padding: '32px' }}>
          <HierbaForm onAdd={() => {}} />
          <div style={{ marginTop: '32px' }}>
            <HierbaList />
          </div>
        </div>
      </div>
    </div>
  );
}

import Login from "../components/Login";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ onAuth }) {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await AuthService.login(email, password);
      onAuth && onAuth();
    } catch (err) {
      // El error se maneja en el componente Login
      throw err;
    }
  };

  const handleRegister = async (email, password) => {
    try {
      await AuthService.register(email, password);
      onAuth && onAuth();
    } catch (err) {
      throw err;
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: 32 }}>Acceso</h2>
      <Login onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  );
}
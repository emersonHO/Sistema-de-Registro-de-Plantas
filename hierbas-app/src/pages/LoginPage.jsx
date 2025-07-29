import Login from "../components/Login";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await AuthService.login(email, password);
      navigate("/dashboard");
    } catch (err) {
      alert("Login inválido");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Login onLogin={handleLogin} />
    </div>
  );
}

import { useState } from "react";

export default function Login({ onLogin, onRegister }) {
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
        await onRegister(email, password);
      } else {
        await onLogin(email, password);
      }
    } catch (err) {
      setError(isRegister ? "Error al registrarse" : "Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 340, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setIsRegister(false)}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: "8px 0 0 8px",
            border: "1px solid #4caf50",
            background: !isRegister ? "#4caf50" : "#fff",
            color: !isRegister ? "#fff" : "#4caf50",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          onClick={() => setIsRegister(true)}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: "0 8px 8px 0",
            border: "1px solid #4caf50",
            background: isRegister ? "#4caf50" : "#fff",
            color: isRegister ? "#fff" : "#4caf50",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Registrarse
        </button>
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, padding: 24, border: "1px solid #ddd", borderRadius: 8, background: "#fafafa" }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" type="email" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="password" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
        <button type="submit" disabled={loading} style={{ padding: 10, borderRadius: 4, background: "#4caf50", color: "white", border: "none", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? (isRegister ? "Registrando..." : "Ingresando...") : (isRegister ? "Registrarse" : "Iniciar sesión")}
        </button>
        {error && <div style={{ color: "#d32f2f", marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
}
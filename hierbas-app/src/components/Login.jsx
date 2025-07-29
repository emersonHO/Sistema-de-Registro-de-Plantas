import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onLogin(email, password);
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12, padding: 24, border: "1px solid #ddd", borderRadius: 8, background: "#fafafa" }}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" type="email" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="password" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
      <button type="submit" disabled={loading} style={{ padding: 10, borderRadius: 4, background: "#4caf50", color: "white", border: "none", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </button>
      {error && <div style={{ color: "#d32f2f", marginTop: 8 }}>{error}</div>}
    </form>
  );
}
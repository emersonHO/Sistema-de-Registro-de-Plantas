import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" type="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="password" />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

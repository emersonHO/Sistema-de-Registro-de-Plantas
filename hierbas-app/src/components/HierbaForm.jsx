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
    setError("");
    setSuccess("");
    if (!nombre || !uso || !origen || !propiedades) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const nuevaHierba = { nombre, uso };
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
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10, padding: 20, border: "1px solid #ddd", borderRadius: 8, background: "#f9f9f9" }}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre de la hierba" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
      <input value={uso} onChange={(e) => setUso(e.target.value)} placeholder="Uso" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
      <input value={origen} onChange={(e) => setOrigen(e.target.value)} placeholder="Origen" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
      <input value={propiedades} onChange={(e) => setPropiedades(e.target.value)} placeholder="Propiedades" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
      <button type="submit" disabled={loading} style={{ padding: 10, borderRadius: 4, background: "#1976d2", color: "white", border: "none", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
        {loading ? "Registrando..." : "Registrar"}
      </button>
      {error && <div style={{ color: "#d32f2f", marginTop: 8 }}>{error}</div>}
      {success && <div style={{ color: "#388e3c", marginTop: 8 }}>{success}</div>}
    </form>
  );
}

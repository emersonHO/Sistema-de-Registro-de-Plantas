import { useEffect, useState } from "react";
import { getHierbas, deleteHierba } from "../services/HierbaService";

export default function HierbaList() {
  const [hierbas, setHierbas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargar = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getHierbas();
      setHierbas(res.data);
    } catch (err) {
      setError("Error al cargar las hierbas");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta hierba?")) return;
    setLoading(true);
    try {
      await deleteHierba(id);
      await cargar();
    } catch (err) {
      setError("Error al eliminar la hierba");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  if (loading) return <div style={{ textAlign: "center", margin: 20 }}>Cargando...</div>;
  if (error) return <div style={{ color: "#d32f2f", textAlign: "center", margin: 20 }}>{error}</div>;

  return (
    <ul style={{ maxWidth: 600, margin: "24px auto", padding: 0, listStyle: "none" }}>
      {hierbas.map((h) => (
        <li key={h.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 6, marginBottom: 10, padding: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>
            <b>{h.nombre}</b> &mdash; {h.uso} &mdash; {h.origen} &mdash; {h.propiedades}
          </span>
          <button onClick={() => eliminar(h.id)} style={{ background: "#d32f2f", color: "white", border: "none", borderRadius: 4, padding: "6px 12px", cursor: "pointer" }}>Eliminar</button>
        </li>
      ))}
      {hierbas.length === 0 && <li style={{ textAlign: "center", color: "#888" }}>No hay hierbas registradas.</li>}
    </ul>
  );
}
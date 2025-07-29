import { useEffect, useState } from "react";
import { getHierbas, deleteHierba } from "../services/HierbaService";
import { updateHierba } from "../services/HierbaService";

export default function HierbaList() {
  const [hierbas, setHierbas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ nombre: "", uso: "", origen: "", propiedades: "" });


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

  const iniciarEdicion = (h) => {
    setEditId(h.id);
    setEditData({ nombre: h.nombre, uso: h.uso, origen: h.origen, propiedades: h.propiedades });
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setEditData({ nombre: "", uso: "", origen: "", propiedades: "" });
  };

  const guardarEdicion = async (id) => {
    setLoading(true);
    setError("");
    try {
      await updateHierba(id, editData);
      setEditId(null);
      await cargar();
    } catch (err) {
      setError("Error al editar la hierba");
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
          {editId === h.id ? (
            <>
              <input value={editData.nombre} onChange={e => setEditData({ ...editData, nombre: e.target.value })} style={{ width: 100 }} />
              <input value={editData.uso} onChange={e => setEditData({ ...editData, uso: e.target.value })} style={{ width: 80 }} />
              <input value={editData.origen} onChange={e => setEditData({ ...editData, origen: e.target.value })} style={{ width: 80 }} />
              <input value={editData.propiedades} onChange={e => setEditData({ ...editData, propiedades: e.target.value })} style={{ width: 120 }} />
              <button onClick={() => guardarEdicion(h.id)} style={{ background: "#1976d2", color: "white", border: "none", borderRadius: 4, padding: "6px 12px", marginLeft: 8, cursor: "pointer" }}>Guardar</button>
              <button onClick={cancelarEdicion} style={{ background: "#888", color: "white", border: "none", borderRadius: 4, padding: "6px 12px", marginLeft: 4, cursor: "pointer" }}>Cancelar</button>
            </>
          ) : (
            <>
              <span>
                <b>{h.nombre}</b> &mdash; {h.uso} &mdash; {h.origen} &mdash; {h.propiedades}
              </span>
              <div>
                <button onClick={() => iniciarEdicion(h)} style={{ background: "#ffa726", color: "white", border: "none", borderRadius: 4, padding: "6px 12px", marginRight: 6, cursor: "pointer" }}>Editar</button>
                <button onClick={() => eliminar(h.id)} style={{ background: "#d32f2f", color: "white", border: "none", borderRadius: 4, padding: "6px 12px", cursor: "pointer" }}>Eliminar</button>
              </div>
            </>
          )}
        </li>
      ))}
      {hierbas.length === 0 && <li style={{ textAlign: "center", color: "#888" }}>No hay hierbas registradas.</li>}
    </ul>
  );
}
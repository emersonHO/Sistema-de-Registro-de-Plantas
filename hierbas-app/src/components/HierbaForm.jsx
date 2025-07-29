import { useState } from "react";
import { addHierba } from "../services/HierbaService";

export default function HierbaForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [uso, setUso] = useState("");
  const [origen, setOrigen] = useState("");
  const [propiedades, setPropiedades] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !uso || !origen || !propiedades) return;

    const nuevaHierba = { nombre, uso };
    const res = await addHierba(nuevaHierba);
    onAdd(res.data); // actualizar lista
    setNombre("");
    setUso("");
    setOrigen("");
    setPropiedades("");
    alert("Hierba registrada exitosamente");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre de la hierba" />
      <input value={uso} onChange={(e) => setUso(e.target.value)} placeholder="Uso" />
      <input value={origen} onChange={(e) => setOrigen(e.target.value)} placeholder="Origen" />
      <input value={propiedades} onChange={(e) => setPropiedades(e.target.value)} placeholder="Propiedades" />
      <button type="submit">Registrar</button>
    </form>
  );
}

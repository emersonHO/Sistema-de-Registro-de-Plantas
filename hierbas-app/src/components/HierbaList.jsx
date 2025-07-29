import { useEffect, useState } from "react";
import { getHierbas, deleteHierba } from "../services/HierbaService";

export default function HierbaList() {
  const [hierbas, setHierbas] = useState([]);

  const cargar = async () => {
    const res = await getHierbas();
    setHierbas(res.data);
  };

  const eliminar = async (id) => {
    await deleteHierba(id);
    cargar();
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <ul>
      {hierbas.map((h) => (
        <li key={h.id}>
          {h.nombre} - {h.uso} - {h.origen} - {h.propiedades}
          {" "}
          <button onClick={() => eliminar(h.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

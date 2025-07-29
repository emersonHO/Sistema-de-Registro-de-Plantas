import HierbaForm from "../components/HierbaForm";
import HierbaList from "../components/HierbaList";

export default function Dashboard() {
  return (
    <div>
      <h2>Panel de Hierbas</h2>
      <HierbaForm onAdd={() => {}} />
      <HierbaList />
    </div>
  );
}

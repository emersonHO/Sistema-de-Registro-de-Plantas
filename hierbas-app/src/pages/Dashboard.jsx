import HierbaForm from "../components/HierbaForm";
import HierbaList from "../components/HierbaList";

export default function Dashboard() {
  return (
    <div>
      <HierbaForm onAdd={() => {}} />
      <HierbaList />
    </div>
  );
}

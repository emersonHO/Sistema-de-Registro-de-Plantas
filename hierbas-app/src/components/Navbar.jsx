import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#e0ffe0" }}>
      <Link to="/">Inicio</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}

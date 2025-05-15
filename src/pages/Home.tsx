import { Link } from "react-router-dom";
import "./Home.css"; // Verifica que la ruta sea correcta

function Home() {
  return (
    <div className="home-container">
      <h1>Página de Inicio</h1>
      <div className="button-group">
        <Link to="/login">Ir a Login</Link>
        <Link to="/notas">Ver Notas</Link>
      </div>
    </div>
  );
}

export default Home;
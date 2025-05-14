import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Página de Inicio</h1>
      <Link to="/login">
        <button>Ir a Login</button>
      </Link>
      <Link to="/notas">
        <button>Ver Notas</button>
      </Link>
    </div>
  );
}

export default Home;
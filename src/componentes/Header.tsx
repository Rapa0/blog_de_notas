import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";

function Header() {
  const auth = useContext(AuthContext);

  return (
    <nav className="header">
      <h1>Blog de Notas</h1>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/notas">Notas</Link>
        {!auth?.user && <Link to="/login">Login</Link>} {/* Solo aparece si NO hay usuario */}
        {auth?.user && (
          <>
            <p>Bienvenido, {auth.user}!</p>
            <button onClick={auth.logout} className="logout-button">Cerrar sesión</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
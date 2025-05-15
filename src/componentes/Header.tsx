import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          {/* El logo se muestra como texto plano */}
          <h1 className="logo">Blog de Notas 9000</h1>
          {/* Botón para ir al inicio */}
          <Link to="/" className="home-btn">
            Inicio
          </Link>
        </div>
        {user ? (
          <div className="auth-info">
            <p className="user-email">Bienvenido, {user.email}</p>
            <button className="logout-btn" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <p className="no-user">No estas logeado, prueba logearte</p>
        )}
      </div>
    </header>
  );
}
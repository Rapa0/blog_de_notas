import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Logout from "./Logout"; 
import "./Header.css";

export default function Header() {
  const { user } = useContext(AuthContext); 

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <h1 className="logo">Blog de Notas 9000</h1>
          <Link to="/" className="home-btn">
            Inicio
          </Link>
        </div>
        {user ? (
          <div className="auth-info">
            <p className="user-email">Bienvenido, {user.email}</p>
            <Logout /> 
          </div>
        ) : (
          <p className="no-user">No estas logeado, prueba logearte</p>
        )}
      </div>
    </header>
  );
}
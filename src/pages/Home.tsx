import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Home.css"; 

const Home: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(user ? "/albion" : "/login");
  };

  const handleNotasClick = () => {
    navigate("/notas");
  };

  return (
    <div className="home-container">
      <h1>Bienvenido a la Página de Inicio</h1>
      <div className="button-group">
        <a onClick={handleLoginClick} style={{ cursor: "pointer" }}>
          Login
        </a>
        <a onClick={handleNotasClick} style={{ cursor: "pointer" }}>
          Ir a Notas
        </a>
      </div>
    </div>
  );
};

export default Home;
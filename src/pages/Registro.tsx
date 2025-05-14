import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import "./Registro.css";

function Registro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegistro = () => {
    const usuarios: { username: string; password: string }[] = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const usuarioExistente = usuarios.find((u) => u.username === username);
    if (usuarioExistente) {
      setError("El usuario ya existe. Intenta con otro nombre.");
      return;
    }

    // Cifrar la contraseña antes de guardarla
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    usuarios.push({ username, password: hashPassword });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    navigate("/login");
  };

  return (
    <div className="registro-container">
      <h2>Registro</h2>
      {error && <p className="error-message">{error}</p>}
      <input type="text" placeholder="Nuevo usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Nueva contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegistro}>Registrarse</button>
    </div>
  );
}

export default Registro;
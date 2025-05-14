import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import bcrypt from "bcryptjs";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (auth?.user) {
    navigate("/notas");
    return null;  //  Evita renderizar la página de login
  }

  const handleLogin = () => {
    const usuarios: { username: string; password: string }[] = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuarioEncontrado = usuarios.find((u) => u.username === username);

    if (!usuarioEncontrado || !bcrypt.compareSync(password, usuarioEncontrado.password)) {
      setError("Credenciales incorrectas. Intenta nuevamente.");
      return;
    }

    auth?.login(username);
    setError("");
    navigate("/notas");
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Ingresar</button>
      <p>¿No tienes cuenta? <button onClick={() => navigate("/registro")}>Regístrate aquí</button></p>
    </div>
  );
}

export default Login;
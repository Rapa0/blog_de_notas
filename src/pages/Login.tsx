import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import "./Home.css";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Validación simple del email
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !isValidEmail(email)) {
      setErrorMsg("Por favor, ingresa un email válido.");
      return;
    }

    if (!password) {
      setErrorMsg("Debes ingresar la contraseña.");
      return;
    }

    try {
      await login(email, password);
      // Después del login, el usuario permanece en esta vista para elegir la opción.
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg("Credenciales incorrectas");
      } else {
        setErrorMsg("Error desconocido al iniciar sesión.");
      }
    }
  };

  if (user) {
    return (
      <div className="home-container">
        <h1>Bienvenido, {user.email}</h1>
        <p>Elige una opción:</p>
        <div className="button-group">
          <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Volver al inicio
          </a>
          <a onClick={() => navigate("/notas")} style={{ cursor: "pointer" }}>
            Ir a Notas
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="auth-link">
        <p>
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
        <p>
          <Link to="/forgot-password">Olvidé mi contraseña</Link>
        </p>
      </div>
    </div>
  );
}
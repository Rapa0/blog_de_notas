// src/pages/Login.tsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Validación simple del formato del email
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
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Error al iniciar sesión. Verifica tus credenciales.";
      setErrorMsg(message);
      console.error("Error en handleLogin:", error);
    }
  };

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
        <button type="submit">Entrar</button>
      </form>
      <div className="auth-link">
        <p>
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import "./ForgotPassword.css";

export default function ForgotPasswordContainer() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Tipo definido para 'e'
    e.preventDefault();
    setErrorMsg("");
    setMessage("");
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Se ha enviado un correo para restablecer tu contraseña.");
      setTimeout(() => navigate("/login"), 3000); // Redirige tras 3 segundos
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Error desconocido.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Recuperar Contraseña</h2>
      <ForgotPasswordForm
        email={email}
        onEmailChange={(e) => setEmail(e.target.value)}
        onSubmit={handleSubmit}
        message={message}
        errorMsg={errorMsg}
        isLoading={isLoading}
      />
      <p>
        <Link to="/login">Volver al Login</Link>
      </p>
    </div>
  );
}

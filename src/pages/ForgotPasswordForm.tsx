import React from "react";
import "./ForgotPassword.css";

interface ForgotPasswordFormProps {
  email: string;
  onEmailChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  message: string;
  errorMsg: string;
  isLoading: boolean;
}

function ForgotPasswordForm({
  email,
  onEmailChange,
  onSubmit,
  message,
  errorMsg,
  isLoading,
}: ForgotPasswordFormProps) {
  return (
    <form onSubmit={onSubmit}>
      {message && <p className="success">{message}</p>}
      {errorMsg && <p className="error">{errorMsg}</p>}
      <input
        type="email"
        placeholder="Ingresa tu correo electrónico"
        value={email}
        onChange={onEmailChange}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Enviar correo de recuperación"}
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
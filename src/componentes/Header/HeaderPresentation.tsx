import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

interface HeaderPresentationProps {
  user?: { uid: string; email: string | null } | null;
  onLogout: () => void;
}

const HeaderPresentation: React.FC<HeaderPresentationProps> = ({ user, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles["header-content"]}>
        <div className={styles["logo-container"]}>
          <h1 className={styles.logo}>Bloc de Notas 9000</h1>
          <Link to="/" className={styles["home-btn"]}>
            Inicio
          </Link>
        </div>
        <div className={styles["auth-info"]}>
          {user ? (
            <>
              <p className={styles["user-email"]}>Bienvenido, {user.email}</p>
              <button className={styles["logout-btn"]} onClick={onLogout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <p className={styles["no-user"]}>No estás logeado</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default React.memo(HeaderPresentation);
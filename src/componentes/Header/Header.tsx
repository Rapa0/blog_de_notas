import React, { useContext, useCallback } from "react";
import HeaderPresentation from "./HeaderPresentation";
import { AuthContext } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return <HeaderPresentation user={user} onLogout={handleLogout} />;
};

export default Header;
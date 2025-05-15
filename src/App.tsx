import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { NotasProvider } from "./context/NotasProvider";
import Header from "./componentes/Header"; 
import Home from "./pages/Home";
import Notas from "./pages/Notas";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import type { JSX } from "react";

function App() {
  return (
    <AuthProvider>
      <NotasProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/notas"
              element={
                <ProtectedRoute>
                  <Notas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </BrowserRouter>
      </NotasProvider>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: JSX.Element }) {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/notas" /> : children;
}

export default App;
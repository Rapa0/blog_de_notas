function Logout({ onLogout }: { onLogout: () => void }) {
    const handleLogout = () => {
        localStorage.removeItem("user");
        onLogout();
    };
    return <button onClick={handleLogout}>Cerrar sesión</button>;
}

export default Logout;
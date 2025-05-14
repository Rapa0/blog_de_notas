import "./PopupNota.css";

function PopupNota({ nota, onClose }: { nota: { titulo: string; contenido: string }; onClose: () => void }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{nota.titulo}</h2>
        <p>{nota.contenido}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default PopupNota;
import { useState } from "react";
import "./NotaCard.css";
import PopupNota from "./PopupNota";

function NotaCard({ nota, onEdit, onDelete }: { nota: { id: number; titulo: string; contenido: string }; onEdit: () => void; onDelete: () => void }) {
    const [mostrarPopup, setMostrarPopup] = useState(false);

return (
    <div>
        <div className="nota-card" onClick={() => setMostrarPopup(true)}>
        <h3>{nota.titulo}</h3>
        <p>{nota.contenido.substring(0, 50)}...</p>
        <div className="button-group">
            <button onClick={(e) => { e.stopPropagation(); onEdit(); }}>Editar</button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>Eliminar</button>
        </div>
    </div>

        {mostrarPopup && <PopupNota nota={nota} onClose={() => setMostrarPopup(false)} />}
    </div>
);
}

export default NotaCard;
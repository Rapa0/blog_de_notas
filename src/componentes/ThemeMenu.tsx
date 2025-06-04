import type { ChangeEvent } from 'react';

interface ThemeMenuProps {
  notesStyle: string;
  setNotesStyle: (style: string) => void;
  styleMode: string;
  setStyleMode: (mode: string) => void;
}

const ThemeMenu: React.FC<ThemeMenuProps> = ({
  notesStyle,
  setNotesStyle,
  styleMode,
  setStyleMode,
}) => {
  const toggleTheme = () => {
    setNotesStyle(notesStyle === "estilo-claro" ? "estilo-oscuro" : "estilo-claro");
  };

  const handleStyleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStyleMode(e.target.value);
  };

  return (
    <div className="notas-sidebar">
      <button onClick={toggleTheme} className="menu-button">
        {notesStyle === "estilo-claro" ? "Modo Oscuro" : "Modo Claro"}
      </button>
      <select value={styleMode} onChange={handleStyleChange} className="menu-button">
        <option value="modern">Notas Modernas</option>
        <option value="classic">Notas Clásicas</option>
        <option value="futuristic">Notas Futuristas</option>
      </select>
      {/* <button className="menu-button">Botón 4</button> */}
    </div>
  );
};

export default ThemeMenu;
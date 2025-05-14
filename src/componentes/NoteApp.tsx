import { useState } from "react";

interface Note {
    id: number;
    title: string;
    content: string;
}

function NoteApp() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState({ title: "", content: "" });

    const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
        setNotes([...notes, { ...newNote, id: Date.now() }]);
        setNewNote({ title: "", content: "" });
    }
};

    const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id: number) => {
    const updatedTitle = prompt("Nuevo título:");
    const updatedContent = prompt("Nuevo contenido:");
    if (updatedTitle && updatedContent) {
      setNotes(notes.map(note => (note.id === id ? { ...note, title: updatedTitle, content: updatedContent } : note)));
    }
  };

  return (
    <div>
      <h2>Notas</h2>
      <input type="text" placeholder="Título" value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} />
      <textarea placeholder="Contenido" value={newNote.content} onChange={e => setNewNote({ ...newNote, content: e.target.value })} />
      <button onClick={addNote}>Agregar Nota</button>

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => editNote(note.id)}>Editar</button>
            <button onClick={() => deleteNote(note.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteApp;
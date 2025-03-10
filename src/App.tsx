import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Note, NoteData, Tag } from "./types";
import Main from "./pages/Main";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Layout from "./components/Layout";
import Undefined from "./pages/Undefined";
import { v4 } from "uuid";
import { toast } from "react-toastify";

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  const createTag = (tag: Tag): void => {
    setTags([...tags, tag]);
  };

  const createNote = (noteData: NoteData): void => {
    try {
      const newNote: Note = { id: v4(), ...noteData };
      setNotes([...notes, newNote]);
      toast.success("Notunuz başarıyla eklenmiştir.");
    } catch (error) {
      toast.error("Bir hata oluştu, not eklenemedi.");
    }
  };

  const deleteNote = (id: string): void => {
    try {
      setNotes(notes.filter((i) => i.id !== id));
      toast.success("Notunuz başarıyla silinmiştir.");
    } catch (error) {
      toast.error("Silinecek not bulunamadı.");
    }
  };

  const updateNote = (id: string, updatedData: NoteData): void => {
    const noteExists = notes.some((note) => note.id === id);
    if (noteExists) {
      const updatedArr = notes.map((note) => (note.id === id ? { id, ...updatedData } : note));
      setNotes(updatedArr);
      toast.success("Notunuz başarıyla güncellenmiştir.");
    } else {
      toast.error("Güncellenecek not bulunamadı.");
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main notes={notes} availableTags={tags} />} />
        <Route path="/new" element={<Create handleSubmit={createNote} createTag={createTag} availableTags={tags} />} />

        <Route path="/note/:id" element={<Layout notes={notes} />}>
          <Route index element={<Detail deleteNote={deleteNote} />} />
          <Route path="edit" element={<Edit handleSubmit={updateNote} createTag={createTag} availableTags={tags} />} />
        </Route>

        <Route path="*" element={<Undefined />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

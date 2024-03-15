import { Route, Routes } from "react-router-dom";
// import style from "./app.module.css";
import NewNote from "../NewNote/NewNote";
import { useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import NoteList from "../NoteList/NoteList";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markDown: string;
  tags: Tag[];
};

export type Tag = {
  lable: string;
  value: string;
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markDown: string;
  tagsIds: string[];
};

export type NoteWithTags = Omit<Note, "tags"> & { tags: Tag[] };

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags: NoteWithTags[] = useMemo(() => {
    return notes.map((note) => {
      const filteredTags = tags.filter((tag) =>
        note.tagsIds.includes(tag.value)
      );
      return { ...note, tags: filteredTags };
    });
  }, [notes, tags]);

  function onCteateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagsIds: tags.map((tag) => tag.value) },
      ];
    });
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <NoteList
            onSubmit={onCteateNote}
            setTags={setTags}
            tags={tags}
            notesWithTags={notesWithTags}
          />
        }
      />
      <Route element={""} />
      <Route
        path="/new"
        element={
          <NewNote onSubmit={onCteateNote} setTags={setTags} tags={tags} />
        }
      />
      <Route path="/id:">
        <Route index element={""} />
        <Route path="edit" element={""} />
      </Route>
      <Route path="*" element={""} />
    </Routes>
  );
}

export default App;

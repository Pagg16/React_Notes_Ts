import { Route, Routes } from "react-router-dom";
// import style from "./app.module.css";
import NewNote from "../NewNote/NewNote";
import { useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

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

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTegs] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...NodeIterator,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.value)),
      };
    });
  }, [notes, tags]);

  function onCteateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [...ptevNotes, { ...data, id: v4() }];
    });
  }

  return (
    <Routes>
      <Route path="/" element={""} />
      <Route element={""} />
      <Route path="/new" element={<NewNote />} />
      <Route path="/id:">
        <Route index element={""} />
        <Route path="edit" element={""} />
      </Route>
      <Route path="*" element={<NewNote />} />
    </Routes>
  );
}

export default App;

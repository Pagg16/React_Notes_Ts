import { Route, Routes } from "react-router-dom";
// import style from "./app.module.css";
import NewNote from "../NewNote/NewNote";
import { useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import NoteList from "../NoteList/NoteList";
import NoteLayout from "../NoteLayout/NoteLayout";
import Note from "../Note/Note";
import EditNote from "../EditNote/EditNote";

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
        { ...data, id: uuidv4(), tagsIds: tags.map((tag) => tag.value) },
        ...prevNotes,
      ];
    });
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagsIds: tags.map((tag) => tag.value) };
        }
        return note;
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function onEditTag(id: string, lable: string) {
    setTags((prevTags) =>
      prevTags.map((tag) => {
        if (tag.value === id) {
          return { ...tag, lable };
        }
        return tag;
      })
    );
  }


  function onDeleteTag(id: string) {
    setTags((prevTags) => prevTags.filter((tag) => tag.value !== id));
    setNotes((prevNotes) =>
      prevNotes.map((note) => ({
        ...note,
        tagsIds: note.tagsIds.filter((tagId) => tagId !== id),
      }))
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <NoteList
            onDeleteTag={onDeleteTag}
            onEditTag={onEditTag}
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

      <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
        <Route index element={<Note onDeleteNote={onDeleteNote} />} />
        <Route
          path="edit"
          element={
            <EditNote onSubmit={onUpdateNote} setTags={setTags} tags={tags} />
          }
        />
      </Route>

      <Route path="*" element={""} />
    </Routes>
  );
}

export default App;

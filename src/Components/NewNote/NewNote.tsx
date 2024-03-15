import { NoteData, Tag } from "../App/App";
import NoteForm from "../NoteForm/NoteForm";
import styles from "./newNote.module.css";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  setTags: (data: Tag[]) => void;
  tags: Tag[];
};

const NewNote = ({ onSubmit, setTags, tags }: NewNoteProps) => {
  return (
    <div className={styles.newNote}>
      <p className={styles.title}>New Note</p>
      <NoteForm
        type={"NewNote"}
        onSubmit={onSubmit}
        setTags={setTags}
        tags={tags}
      />
    </div>
  );
};

export default NewNote;

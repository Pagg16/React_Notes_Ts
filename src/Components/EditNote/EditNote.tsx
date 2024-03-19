import { NoteData, Tag } from "../App/App";
import NoteForm from "../NoteForm/NoteForm";
import styles from "../NewNote/newNote.module.css";
import { useNote } from "../NoteLayout/NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  setTags: (data: Tag[]) => void;
  tags: Tag[];
};

const EditNote = ({ onSubmit, setTags, tags }: EditNoteProps) => {
  const note = useNote();

  return (
    <div className={styles.newNote}>
      <p className={styles.title}>Edit Note</p>
      <NoteForm
        type={"NewNote"}
        currentNote={note}
        onSubmit={(data) => onSubmit(note.id, data)}
        setTags={setTags}
        tags={tags}
      />
    </div>
  );
};

export default EditNote;

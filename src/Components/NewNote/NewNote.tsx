import NoteForm from "../NoteForm/NoteForm";
import styles from "./newNote.module.css";

const NewNote = () => {
  return (
    <div className={styles.newNote}>
      <p className={styles.title}>New Note</p>
      <NoteForm />
    </div>
  );
};

export default NewNote;

import NoteForm from "../NoteForm/NoteForm";
import styles from "./newNote.module.css";

const NewNote = () => {
  function onSubmit() {}
  return (
    <div className={styles.newNote}>
      <p className={styles.title}>New Note</p>
      <NoteForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewNote;

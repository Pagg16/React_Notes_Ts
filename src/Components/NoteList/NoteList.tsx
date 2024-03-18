import { NoteData, NoteWithTags, Tag } from "../App/App";
import styles from "./noteList.module.css";
import NoteForm from "../NoteForm/NoteForm";
import { Link } from "react-router-dom";

type NoteListProps = {
  notesWithTags?: NoteWithTags[];
  onSubmit: (data: NoteData) => void;
  setTags: (data: Tag[]) => void;
  tags: Tag[];
};

export default function NoteList({
  notesWithTags,
  onSubmit,
  setTags,
  tags,
}: NoteListProps) {
  return (
    <div className={styles.noteList}>
      <div className={styles.header}>
        Notes
        <div className={styles.controlBar}>
          <Link className={styles.link} to="/new">
            <button className={styles.btn}>Create</button>
          </Link>
          <button className={styles.btn}>Edit Tags</button>
        </div>
      </div>
      <NoteForm
        notesWithTags={notesWithTags}
        type={"NoteList"}
        onSubmit={onSubmit}
        setTags={setTags}
        tags={tags}
      />
    </div>
  );
}

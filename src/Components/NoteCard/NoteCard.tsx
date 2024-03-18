import { useNavigate } from "react-router-dom";
import { Note } from "../App/App";
import styles from "./noteCard.module.css";

type NoteCard = Omit<Note, "markDown">;

export default function NoteCard({ title, tags, id }: NoteCard) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/${id}`)} className={styles.noteCard}>
      <div className={styles.title}>{title}</div>
      <div className={styles.tagsBlock}>
        {tags.map((tag) => (
          <div className={styles.tag} key={tag.value}>
            {tag.lable}
          </div>
        ))}
      </div>
    </div>
  );
}

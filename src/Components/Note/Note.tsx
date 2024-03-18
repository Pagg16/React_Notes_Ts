import Markdown from "react-markdown";
import { useNote } from "../NoteLayout/NoteLayout";
import styles from "./note.module.css";

export default function Note() {
  const { title, tags, markDown } = useNote();

  return (
    <div className={styles.note}>
      <div className={styles.header}>
        <div className={styles.description}>
          <div className={styles.title}>{title}</div>

          <div className={styles.tagsBlock}>
            {[
              ...tags,
              ...tags,
              ...tags,
              ...tags,
              ...tags,
              ...tags,
              ...tags,
              ...tags,
            ].map((tag) => (
              <div className={styles.tag} key={tag.value}>
                {tag.lable}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.controlNar}>
          <button className={styles.btn}>Edit</button>
          <button className={styles.btn}>Delete</button>
          <button className={styles.btn}>Back</button>
        </div>
      </div>
      <div>
        <Markdown>{markDown}</Markdown>
      </div>
    </div>
  );
}

import { Tag } from "../App/App";
import styles from "./noteCard.module.css";

type NoteCard = {
  title: string;
  tags: Tag[];
};

export default function NoteCard({ title, tags }: NoteCard) {
  return (
    <div className={styles.noteCard}>
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

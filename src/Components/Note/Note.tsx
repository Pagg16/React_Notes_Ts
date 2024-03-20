import Markdown from "react-markdown";
import { useNote } from "../NoteLayout/NoteLayout";
import styles from "./note.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DelitePopup from "../Popup/DelitePopup";

type NoteProps = {
  onDeleteNote: (id: string) => void;
};

export default function Note({ onDeleteNote }: NoteProps) {
  const { title, tags, markDown, id } = useNote();
  const [isDeletePopup, setIsDeletePopup] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className={styles.note}>
      <div className={styles.header}>
        <div className={styles.description}>
          <div className={styles.title}>{title}</div>

          {tags.length > 0 && (
            <div className={styles.tagsBlock}>
              {tags.map((tag) => (
                <div className={styles.tag} key={tag.value}>
                  {tag.lable}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.controlBar}>
          <button onClick={() => navigate("edit")} className={styles.btn}>
            Edit
          </button>
          <button onClick={() => setIsDeletePopup(true)} className={styles.btn}>
            Delete
          </button>
          <button onClick={() => navigate("..")} className={styles.btn}>
            Back
          </button>
        </div>
      </div>
      <div className={styles.markDownContainer}>
        <Markdown className={styles.markDown}>{markDown}</Markdown>
      </div>
      {isDeletePopup && (
        <DelitePopup
          deleteFun={() => onDeleteNote(id)}
          close={() => setIsDeletePopup(false)}
        />
      )}
    </div>
  );
}

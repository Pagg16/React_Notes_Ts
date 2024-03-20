import { NoteData, NoteWithTags, Tag } from "../App/App";
import styles from "./noteList.module.css";
import NoteForm from "../NoteForm/NoteForm";
import { Link } from "react-router-dom";
import { useState } from "react";
import cn from "classnames";
import DelitePopup from "../Popup/DelitePopup";

import BASE_TAGS from "../../constants/BASE_TAGS";

type NoteListProps = {
  onDeleteTag: (id: string) => void;
  onEditTag: (id: string, lable: string) => void;
  notesWithTags?: NoteWithTags[];
  onSubmit: (data: NoteData) => void;
  setTags: (data: Tag[]) => void;
  tags: Tag[];
};

export default function NoteList({
  onDeleteTag,
  onEditTag,
  notesWithTags,
  onSubmit,
  setTags,
  tags,
}: NoteListProps) {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isDeletePopup, setIsDeletePopup] = useState<boolean>(false);
  const [tagId, setTagId] = useState<string>("");

  function isBaseTag(id: string) {
    return BASE_TAGS.find((tagId) => tagId.value === id);
  }

  return (
    <div onClick={() => setIsOpenPopup(false)} className={styles.noteList}>
      <div className={styles.header}>
        Notes
        <div className={styles.controlBar}>
          <Link className={styles.link} to="/new">
            <button className={styles.btn}>Create</button>
          </Link>
          <button
            onClick={(e) => {
              !isOpenPopup && e.stopPropagation();
              setIsOpenPopup(true);
            }}
            className={styles.btn}
          >
            Edit Tags
          </button>
        </div>
      </div>
      <NoteForm
        notesWithTags={notesWithTags}
        type={"NoteList"}
        onSubmit={onSubmit}
        setTags={setTags}
        tags={tags}
      />
      {isOpenPopup && (
        <div className={styles.popupBlock}>
          <div onClick={(e) => e.stopPropagation()} className={styles.popup}>
            <div className={styles.tags}>
              {tags?.map((tag) => (
                <div className={styles.tag} key={tag.value}>
                  {isBaseTag(tag.value) ? (
                    <div className={styles.tagName}>{tag.lable}</div>
                  ) : (
                    <input
                      className={styles.input}
                      onChange={(e) => onEditTag(tag.value, e.target.value)}
                      value={tag.lable}
                    />
                  )}

                  {!isBaseTag(tag.value) && (
                    <button
                      onClick={() => {
                        setTagId(tag.value);
                        setIsDeletePopup(true);
                      }}
                      className={styles.delete}
                    >
                      x
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsOpenPopup(false)}
              className={cn(styles.btn, styles.btnBack)}
            >
              Back
            </button>
          </div>
        </div>
      )}
      {isDeletePopup && (
        <DelitePopup
          deleteFun={() => onDeleteTag(tagId)}
          close={() => setIsDeletePopup(false)}
        />
      )}
    </div>
  );
}

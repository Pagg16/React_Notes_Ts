import { useState, ChangeEvent, useMemo } from "react";
import style from "./noteForm.module.css";
import Select, { SelectOptions } from "../Select/Select";
import { Link, useNavigate } from "react-router-dom";
import { Note, NoteData, NoteWithTags, Tag } from "../App/App";
import NoteCard from "../NoteCard/NoteCard";
import cn from "classnames";

import BASE_TAGS from "../../constants/BASE_TAGS";

type NoteFormProps = {
  currentNote?: Note;
  notesWithTags?: NoteWithTags[];
  onSubmit: (data: NoteData) => void;
  setTags: (data: Tag[]) => void;
  tags: Tag[];
  type: "NoteList" | "NewNote";
};

const NoteForm = ({
  currentNote,
  notesWithTags,
  onSubmit,
  setTags,
  tags,
  type,
}: NoteFormProps) => {
  const [selectTags, setSelectTags] = useState<SelectOptions[]>(
    currentNote ? currentNote.tags : []
  );
  const [selectInput, setSelectInput] = useState<string>("");
  const [bodyInput, setBodyInput] = useState<string>(
    currentNote ? currentNote.markDown : ""
  );
  const [titleInput, setTitleInput] = useState<string>(
    currentNote ? currentNote.title : ""
  );

  const navigate = useNavigate();

  const notesSorted = useMemo(() => {
    return notesWithTags?.filter((note) => {
      return (
        (titleInput === "" ||
          note.title.toLowerCase().includes(titleInput.toLowerCase())) &&
        (selectTags.length === 0 ||
          selectTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.lable === tag.lable)
          ))
      );
    });
  }, [notesWithTags, selectTags, titleInput]);

  const options = useMemo(() => {
    return tags
      .filter(
        (item) =>
          !BASE_TAGS.find(
            (elem) => item.value === elem.value && item.lable === elem.lable
          )
      )
      .concat(BASE_TAGS);
  }, [selectTags]);

  function handleBodyChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setBodyInput(e.target.value);
  }

  function createNote() {
    settingTags();
    onSubmit({
      title: titleInput,
      markDown: bodyInput,
      tags: selectTags,
    });
    navigate("..");
  }

  function settingTags() {
    const newTags: Tag[] = selectTags
      .filter(
        (item) =>
          !tags.find(
            (elem) => item.value === elem.value && item.lable === elem.lable
          )
      )
      .concat(tags);
    setTags(newTags);
  }

  return (
    <div className={style.noteForm}>
      <div className={style.inputsBlock}>
        <div className={style.inputBlock}>
          <label className={style.inputLable} htmlFor="inputTitle">
            Title
          </label>
          <input
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            className={style.input}
            type="text"
            id="inputTitle"
          />
        </div>

        <div className={style.inputBlock}>
          <label className={style.inputLable} htmlFor="inputTags">
            Tags
          </label>
          <Select
            id="inputTags"
            setSelectInput={setSelectInput}
            selectInput={selectInput}
            multiple={true}
            options={options}
            value={selectTags}
            onChange={(elem) => setSelectTags(elem)}
          />
        </div>
      </div>

      <div
        className={cn(
          style.bodyBlock,
          `${type === "NoteList" ? style.bodyBlockNoteList : ""}`
        )}
      >
        {type === "NewNote" && (
          <>
            <label className={style.bodyLable}>Body</label>
            <textarea
              value={bodyInput}
              onChange={(e) => handleBodyChange(e)}
              className={style.bodyInput}
            ></textarea>
          </>
        )}
        {type === "NoteList" &&
          notesSorted?.map((elem) => (
            <NoteCard
              key={elem.id}
              title={elem.title}
              tags={elem.tags}
              id={elem.id}
            />
          ))}
      </div>

      {type === "NewNote" && (
        <div className={style.buttonControlBlock}>
          <button onClick={createNote} className={style.saveBtn}>
            Save
          </button>
          <Link className={style.buttonLink} to="/">
            <button className={style.canselBtn}>Cancel</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NoteForm;

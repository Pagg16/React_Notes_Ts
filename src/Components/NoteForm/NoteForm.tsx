import { useState, ChangeEvent, useMemo } from "react";
import style from "./noteForm.module.css";
import Select, { SelectOptions } from "../Select/Select";
import { Link, useNavigate } from "react-router-dom";
import { NoteData, NoteWithTags, Tag } from "../App/App";
import NoteCard from "../NoteCard/NoteCard";
import cn from "classnames";

const BASE_OPTIONS: SelectOptions[] = [
  { lable: "JS", value: "1" },
  { lable: "Redux", value: "2 " },
  { lable: "React", value: "3" },
  { lable: "typeScript", value: "4" },
  { lable: "CSS", value: "5" },
  { lable: "HTML", value: "6" },
];

type NoteFormProps = {
  notesWithTags?: NoteWithTags[];
  onSubmit: (data: NoteData) => void;
  setTags: (data: Tag[]) => void;
  tags: Tag[];
  type: "NoteList" | "NewNote";
};

const NoteForm = ({
  notesWithTags,
  onSubmit,
  setTags,
  tags,
  type,
}: NoteFormProps) => {
  const [selectTags, setSelectTags] = useState<SelectOptions[]>([]);
  const [selectInput, setSelectInput] = useState<string>("");
  const [bodyInput, setBodyInput] = useState<string>("");
  const [titleInput, setTitleInput] = useState<string>("");

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
          !BASE_OPTIONS.find(
            (elem) => item.value === elem.value && item.lable === elem.lable
          )
      )
      .concat(BASE_OPTIONS);
  }, [selectTags]);

  function handleBodyChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setBodyInput(e.target.value);
  }

  function createNote() {
    const newTags: Tag[] = selectTags
      .filter(
        (item) =>
          !tags.find(
            (elem) => item.value === elem.value && item.lable === elem.lable
          )
      )
      .concat(tags);
    setTags(newTags);
    onSubmit({
      title: titleInput,
      markDown: bodyInput,
      tags: selectTags,
    });
    navigate("..");
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
          <Link className={style.buttonLink} to="..">
            <button className={style.canselBtn}>Cancel</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NoteForm;

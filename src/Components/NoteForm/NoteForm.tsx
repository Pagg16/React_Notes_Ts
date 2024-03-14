import { useState, ChangeEvent } from "react";
import style from "./noteForm.module.css";
import Select, { SelectOptions } from "../Select/Select";
import { Link } from "react-router-dom";
import { NoteData } from "../App/App";

const BASE_OPTIONS: SelectOptions[] = [
  { lable: "JS", value: "1" },
  { lable: "Redux", value: "2 " },
  { lable: "React", value: "3" },
  { lable: "typeScript", value: "4" },
  { lable: "CSS", value: "5" },
  { lable: "HTML", value: "6" },
];

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const [multipleValue, setMultipleValue] = useState<SelectOptions[]>([]);
  const [options, setOptions] = useState<SelectOptions[]>(BASE_OPTIONS);
  const [selectInput, setSelectInput] = useState<string>("");
  const [bodyInput, setBodyInput] = useState<string>("");
  const [titleInput, setTitleInput] = useState<string>("");

  function handleBodyChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setBodyInput(e.target.value);
  }

  function createNote() {
    onSubmit({
      title: titleInput,
      markDown: bodyInput,
      tags: multipleValue,
    });
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
          <label className={style.inputLable} htmlFor="inputTitle">
            Tags
          </label>
          <Select
            BASE_OPTIONS={BASE_OPTIONS}
            setOptions={(elem) => setOptions(elem)}
            setSelectInput={setSelectInput}
            selectInput={selectInput}
            multiple={true}
            options={options}
            value={multipleValue}
            onChange={(elem) => setMultipleValue(elem)}
          />
        </div>
      </div>
      <div className={style.bodyBlock}>
        <label className={style.bodyLable}>Body</label>
        <textarea
          value={bodyInput}
          onChange={(e) => handleBodyChange(e)}
          className={style.bodyInput}
        ></textarea>
      </div>
      <div className={style.buttonControlBlock}>
        <button onClick={createNote} className={style.saveBtn}>
          Save
        </button>
        <Link className={style.buttonLink} to="..">
          <button className={style.canselBtn}>Cancel</button>
        </Link>
      </div>
    </div>
  );
};

export default NoteForm;

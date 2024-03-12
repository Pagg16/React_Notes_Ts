import { useState, ChangeEvent } from "react";
import style from "./noteForm.module.css";
import Select, { SelectOptions } from "../Select/Select";
import { useNavigate } from "react-router-dom";

const BASE_OPTIONS: SelectOptions[] = [
  { lable: "JS", value: 1 },
  { lable: "Redux", value: 2 },
  { lable: "React", value: 3 },
  { lable: "typeScript", value: 4 },
  { lable: "CSS", value: 5 },
  { lable: "HTML", value: 6 },
];

const NoteForm = () => {
  const [multipleValue, setMultipleValue] = useState<SelectOptions[]>([]);
  const [options, setOptions] = useState<SelectOptions[]>(BASE_OPTIONS);
  const [selectInput, setSelectInput] = useState<string>("");
  const [bodyInput, setBodyInput] = useState<string>("");

  const history = useNavigate();

  function handleBodyChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setBodyInput(e.target.value);
  }

  console.log(multipleValue);

  // function createNote() {}

  return (
    <div className={style.noteForm}>
      <div className={style.inputsBlock}>
        <div className={style.inputBlock}>
          <label className={style.inputLable} htmlFor="inputTitle">
            Title
          </label>
          <input className={style.input} type="text" id="inputTitle" />
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
        <button className={style.saveBtn}>Save</button>
        <button onClick={() => history(-1)} className={style.canselBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteForm;

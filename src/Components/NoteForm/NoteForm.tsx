import { useState, ChangeEvent } from "react";
import style from "./noteForm.module.css";
import Select, { SelectOptions } from "../Select/Select";

const BASE_OPTIONS: SelectOptions[] = [
  { lable: "First", value: 1 },
  { lable: "Secong", value: 2 },
  { lable: "Third", value: 3 },
  { lable: "Fourth", value: 4 },
  { lable: "Fifth", value: 5 },
  { lable: "Sixth", value: 6 },
  { lable: "Seventh", value: 7 },
];

const NoteForm = () => {
  const [multipleValue, setMultipleValue] = useState<SelectOptions[]>([]);
  const [options, setOptions] = useState<SelectOptions[]>(BASE_OPTIONS);
  const [selectInput, setSelectInput] = useState<string>("");
  const [bodyInput, setBodyInput] = useState<string>("");

  function handleBodyChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setBodyInput(e.target.value);
  }

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
        <button className={style.canselBtn}>Cancel</button>
      </div>
    </div>
  );
};

export default NoteForm;

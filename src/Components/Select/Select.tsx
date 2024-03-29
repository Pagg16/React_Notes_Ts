import {
  useEffect,
  useState,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import styles from "./select.module.css";
import { v4 as uuidv4 } from "uuid";

export type SelectOptions = {
  lable: string;
  value: string;
};

type MultipleSelectProps = {
  multiple: true;
  onChange: (newValue: SelectOptions[]) => void;
  value: SelectOptions[];
};

type SingleSelectProps = {
  multiple?: false;
  onChange: (value: SelectOptions | undefined) => void;
  value: SelectOptions | undefined;
};

type SelectionProps = {
  id: string;
  options: SelectOptions[];
  setSelectInput: (value: string) => void;
  selectInput: string;
} & (SingleSelectProps | MultipleSelectProps);

export default function Select({
  id,
  setSelectInput,
  selectInput,
  multiple,
  value,
  onChange,
  options,
}: SelectionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mouseEnterIndex, setMouseEnterIndex] = useState<number | undefined>();

  function clearOptions(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option: SelectOptions): void {
    if (multiple) {
      if (
        value.find(
          (elem) => option.lable === elem.lable && option.value === elem.value
        )
      ) {
        onChange(
          value.filter(
            (elem) => option.lable !== elem.lable && option.value !== elem.value
          )
        );
      } else {
        onChange([...value, option]);
      }
    } else if (option !== value) {
      onChange(option);
    }
  }

  function isOptionSelected(option: SelectOptions) {
    return multiple
      ? value.find((elem) => option.lable === elem.lable)
      : option === value;
  }

  function handlerKeyPressSelect(e: KeyboardEvent) {
    switch (e.code) {
      case "Escape":
        return setIsOpen(false);

      case "Enter":
        return mouseEnterIndex && selectOption(options[mouseEnterIndex]);

      case "Space":
        return mouseEnterIndex && selectOption(options[mouseEnterIndex]);

      case "ArrowUp":
        return setMouseEnterIndex((state) => {
          if (state === undefined || state <= 0) return options.length - 1;

          return state && state - 1;
        });

      case "ArrowDown":
        return setMouseEnterIndex((state) => {
          if (state === undefined || state >= options.length - 1) return 0;
          return state + 1;
        });

      default:
        break;
    }
  }

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setSelectInput(e.target.value.trim());
  }

  function handlerKeyPressInput(e: KeyboardEvent) {
    if (!(e.code === "Space" || e.code === "Enter")) {
      return;
    }

    onAddTagInput(selectInput);
  }

  function onAddTagInput(currentValue: string) {
    if (selectInput === "") return;

    const currentValueFind = options.find(
      (tag) => tag.lable.toLowerCase() === currentValue.toLowerCase()
    );

    if (
      multiple &&
      currentValue &&
      !value.find(
        (elem) =>
          elem.lable ===
            (currentValueFind ? currentValueFind.lable : currentValue) ||
          elem.value === (currentValueFind && currentValueFind.value)
      ) &&
      options.length < 31
    ) {
      const elem: SelectOptions = {
        lable: currentValueFind ? currentValueFind.lable : currentValue,
        value: currentValueFind ? currentValueFind.value : uuidv4(),
      };
      onChange([...value, elem]);
      setSelectInput("");
    }
  }

  useEffect(() => {
    setMouseEnterIndex(undefined);
  }, [isOpen]);

  return (
    <div
      onKeyDown={(e: KeyboardEvent) => handlerKeyPressSelect(e)}
      onBlur={() => {
        onAddTagInput(selectInput);
        setIsOpen(false);
      }}
      onClick={() => setIsOpen((state) => !state)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value?.map((elem) => (
              <button
                key={elem.value}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  selectOption(elem);
                }}
                className={styles.optionBage}
              >
                {elem.lable}
                <span className={styles.removeBtn}> &times;</span>
              </button>
            ))
          : value?.lable}

        <div className={styles.inputBlock}>
          <input
            autoComplete="off"
            spellCheck="false"
            id={id}
            value={selectInput}
            type="text"
            className={styles.input}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleChangeInput(e)}
            onKeyDown={(e) => handlerKeyPressInput(e)}
            placeholder="enter..."
          />
        </div>
      </span>
      <button
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          clearOptions(e);
        }}
        className={styles.clearBtn}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onMouseEnter={() => setMouseEnterIndex(index)}
            onClick={(e: MouseEvent<HTMLLIElement>) => {
              e.stopPropagation();
              selectOption(option);
            }}
            key={option.value}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            } ${mouseEnterIndex === index ? styles.highlighted : ""}`}
          >
            {option.lable}
          </li>
        ))}
      </ul>
    </div>
  );
}

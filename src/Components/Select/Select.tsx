import {
  useEffect,
  useState,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import styles from "./select.module.css";

export type SelectOptions = {
  lable: string;
  value: string | number;
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
  BASE_OPTIONS: SelectOptions[];
  setOptions: (value: SelectOptions[]) => void;
  options: SelectOptions[];
  setSelectInput: (value: string) => void;
  selectInput: string;
} & (SingleSelectProps | MultipleSelectProps);

export default function Select({
  BASE_OPTIONS,
  setOptions,
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
      if (value.includes(option)) {
        onChange(value.filter((elem) => elem !== option));

        if (
          BASE_OPTIONS.find(
            (elem) => elem.lable === option.lable && elem.value === option.value
          )
        ) {
          return;
        }

        setOptions(options.filter((elem) => elem !== option));
      } else {
        onChange([...value, option]);
      }
    } else if (option !== value) {
      onChange(option);
    }
  }

  function isOptionSelected(option: SelectOptions) {
    return multiple ? value.includes(option) : option === value;
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
    setSelectInput(e.target.value);
  }

  function handlerKeyPressInput(e: KeyboardEvent) {
    const currentValue = selectInput.trim();

    if (
      multiple &&
      currentValue &&
      !value.find((elem) => elem.value === currentValue) &&
      options.length < 31
    ) {
      if (e.code === "Space" || e.code === "Enter") {
        const elem: SelectOptions = {
          lable: currentValue,
          value: currentValue,
        };
        onChange([...value, elem]);
        setOptions([...options, elem]);
        setSelectInput("");
      }
    }
  }

  useEffect(() => {
    setMouseEnterIndex(undefined);
  }, [isOpen]);

  return (
    <div
      onKeyDown={(e: KeyboardEvent) => handlerKeyPressSelect(e)}
      onBlur={() => {
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
            value={selectInput}
            spellCheck={false}
            type="text"
            className={styles.input}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleChangeInput(e)}
            onKeyDown={(e) => handlerKeyPressInput(e)}
            placeholder="enter..."
          />
          <label className={styles.cursor}></label>
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

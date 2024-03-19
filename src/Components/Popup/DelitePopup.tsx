import styles from "./delitePopup.module.css";

type DelitePopup = {
  deleteFun: () => void;
  close: () => void;
};

export default function DelitePopup({ deleteFun, close }: DelitePopup) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        close();
      }}
      className={styles.popupBlock}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.deletePopup}>
        Are you sure you want to delete ?
        <div className={styles.popupBts}>
          <button
            ref={(e) => e && e.focus()}
            onClick={() => {
              close();
              deleteFun();
            }}
            className={styles.btn}
          >
            Yes
          </button>
          <button onClick={() => close()} className={styles.btn}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

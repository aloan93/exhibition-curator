import { ReactNode, useState } from "react";
import styles from "./SavedExhibition.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { savedExhibitionType } from "../../types";

export default function TitleContainer(props: {
  exhibition: savedExhibitionType;
  isRenameLoading: boolean;
  setIsRenameLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setQueryError: React.Dispatch<React.SetStateAction<string>>;
  isDeleteLoading: boolean;
  isDeletionSuccess: boolean;
}): ReactNode {
  const [displayedTitle, setDisplayedTitle] = useState(
    props.exhibition.exhibitionName
  );
  const [renameInput, setRenameInput] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);

  function handleRename(e: any) {
    e.preventDefault();
    props.setIsRenameLoading(true);
    props.setQueryError("");
    setDoc(
      doc(db, "Exhibitions", props.exhibition.exhibitionId),
      { exhibitionName: renameInput },
      { merge: true }
    )
      .then(() => {
        setDisplayedTitle(renameInput);
        setIsRenaming(false);
        setRenameInput("");
        props.setIsRenameLoading(false);
      })
      .catch(() => {
        props.setQueryError(
          "Failed to rename exhibition. Please try again later"
        );
        setIsRenaming(false);
        props.setIsRenameLoading(false);
      });
  }

  return (
    <div className={styles.titleContainer}>
      {isRenaming ? (
        <>
          <form className={styles.formContainer} onSubmit={handleRename}>
            <input
              className={styles.renameInput}
              id="rename"
              aria-label="Rename Exhibition"
              autoComplete="off"
              autoCorrect="off"
              type="text"
              placeholder={props.exhibition.exhibitionName}
              value={renameInput}
              onChange={(e) => setRenameInput(e.target.value)}
              required
            />

            <button
              className={styles.renameSubmitBtn}
              aria-label="Submit Rename">
              {"✔"}
            </button>

            {props.isRenameLoading ? (
              <div className={`${styles.renameLoader} ${styles.loader}`}></div>
            ) : null}
          </form>

          <button
            className={styles.cancelBtn}
            aria-label="Cancel Rename"
            onClick={() => setIsRenaming(!isRenaming)}
            disabled={props.isDeleteLoading || props.isRenameLoading}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2 className={styles.title}>{displayedTitle}</h2>

          <button
            className={styles.renameBtn}
            aria-label="Rename the exhibition"
            onClick={() => setIsRenaming(!isRenaming)}
            hidden={props.isDeletionSuccess}>
            Rename
          </button>
        </>
      )}
    </div>
  );
}

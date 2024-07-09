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
  const url = location.href.replace("profile", "guest-exhibition");

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

  // function to handle clipboard copy rather than inline due to copy not executing until alert was closed
  function handleShare(e: any) {
    e.preventDefault();
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard");
      })
      .catch(() => {
        alert("Failed to copy URL. Please try again later");
      });
  }

  return (
    <div className={styles.titleContainer}>
      <div className={styles.renameContainer}>
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
                <div
                  className={`${styles.renameLoader} ${styles.loader}`}></div>
              ) : null}
            </form>

            <button
              className={styles.cancelBtn}
              aria-label="Cancel Rename"
              onClick={() => setIsRenaming(!isRenaming)}
              disabled={props.isDeleteLoading || props.isRenameLoading}>
              ❌
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
              🖊
            </button>
          </>
        )}
      </div>

      <button
        className={styles.backBtn}
        aria-label="Copy share link to exhibition"
        onClick={handleShare}
        hidden={props.isDeletionSuccess}>
        Share
      </button>
    </div>
  );
}

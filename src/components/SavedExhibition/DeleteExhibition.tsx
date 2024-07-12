import { ReactNode } from "react";
import styles from "./SavedExhibition.module.css";
import { savedExhibitionType } from "../../types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default function DeleteExhibition(props: {
  exhibition: savedExhibitionType;
  isRenameLoading: boolean;
  setQueryError: React.Dispatch<React.SetStateAction<string>>;
  isDeleteLoading: boolean;
  setIsDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isDeletionSuccess: boolean;
  setIsDeletionSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode {
  function handleDelete(e: any) {
    e.preventDefault();
    props.setIsDeleteLoading(true);
    props.setIsDeletionSuccess(false);
    props.setQueryError("");
    deleteDoc(doc(db, "Exhibitions", props.exhibition.exhibitionId))
      .then(() => {
        props.setIsDeletionSuccess(true);
        props.setIsDeleteLoading(false);
      })
      .catch(() => {
        props.setQueryError(
          "Failed to delete exhibition. Please try again later"
        );
        window.scroll(0, 0);
        props.setIsDeleteLoading(false);
      });
  }

  return (
    <>
      {props.isDeleteLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <button
          className={styles.deleteBtn}
          aria-label="Delete the exhibition"
          onClick={handleDelete}
          disabled={props.isRenameLoading}
          hidden={props.isDeletionSuccess}>
          Delete Exhibition
        </button>
      )}
    </>
  );
}

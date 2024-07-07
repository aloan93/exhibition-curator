import { ReactNode } from "react";
import styles from "./SavedExhibition.module.css";
import { savedExhibitionType } from "../../types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function ButtonContainer(props: {
  exhibition: savedExhibitionType;
  isRenameLoading: boolean;
  setQueryError: React.Dispatch<React.SetStateAction<string>>;
  isDeleteLoading: boolean;
  setIsDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isDeletionSuccess: boolean;
  setIsDeletionSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode {
  const navigate = useNavigate();

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
        props.setIsDeleteLoading(false);
      });
  }

  return (
    <div className={styles.btnContainer}>
      <button
        className={styles.backBtn}
        aria-label="Back to previous page"
        onClick={() => navigate(-1)}
        disabled={props.isDeleteLoading || props.isRenameLoading}>
        Back
      </button>

      {props.isDeleteLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <button
          className={styles.deleteBtn}
          aria-label="Delete the exhibition"
          onClick={handleDelete}
          hidden={props.isDeletionSuccess}>
          Delete
        </button>
      )}
    </div>
  );
}

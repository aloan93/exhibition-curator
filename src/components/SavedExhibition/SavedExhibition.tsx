import { ReactNode, useEffect, useState } from "react";
import styles from "./SavedExhibition.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EntrySelecter from "../MyExhibition/EntrySelecter";
import { doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from "../../hooks/useAuth";

export default function SavedExhibition(): ReactNode {
  const { exhibitionId } = useParams();
  const { currentUser } = useAuth();
  const [exhibition, setExhibition] = useState<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [initialError, setInitialError] = useState("");
  const [queryError, setQueryError] = useState("");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeletionSuccess, setIsDeletionSuccess] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameInput, setRenameInput] = useState("");
  const [isRenameLoading, setIsRenameLoading] = useState(false);
  const [isRenameSuccess, setIsRenameSuccess] = useState(false);

  useEffect(() => {
    !currentUser ? navigate(from, { replace: true }) : null;
  }, [currentUser]);

  useEffect(() => {
    setIsInitialLoading(true);
    setInitialError("");
    getDoc(doc(db, "Exhibitions", exhibitionId || ""))
      .then((res) => {
        if (!res.exists()) {
          setInitialError("Exhibition not found");
          return null;
        } else {
          return res.data();
        }
      })
      .then((document) => {
        if (document && document.user.id !== currentUser.uid) {
          setInitialError("No permission to view this exhibition");
        } else if (document && document.user.id === currentUser.uid) {
          setExhibition({ ...document, exhibitionId });
        }
        setIsInitialLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setInitialError("Something went wrong. Please try again later");
        setIsInitialLoading(false);
      });
  }, [isRenameSuccess]);

  function handleDelete(e: any) {
    e.preventDefault();
    setIsDeleteLoading(true);
    setIsDeletionSuccess(false);
    setQueryError("");
    deleteDoc(doc(db, "Exhibitions", exhibition.exhibitionId))
      .then(() => {
        setIsDeletionSuccess(true);
        setIsDeleteLoading(false);
      })
      .catch(() => {
        setQueryError("Failed to delete exhibition. Please try again later");
        setIsDeleteLoading(false);
      });
  }

  function handleRename(e: any) {
    e.preventDefault();
    setIsRenameLoading(true);
    setIsRenameSuccess(false);
    setQueryError("");
    setDoc(
      doc(db, "Exhibitions", exhibition.exhibitionId),
      { exhibitionName: renameInput },
      { merge: true }
    )
      .then(() => {
        setIsRenameSuccess(true);
        setIsRenaming(false);
        setRenameInput("");
      })
      .then(() => {
        setIsRenameLoading(false);
      })
      .catch(() => {
        setQueryError("Failed to rename exhibition. Please try again later");
        setIsRenaming(false);
        setIsRenameLoading(false);
      });
  }

  return (
    <div className={styles.container}>
      {isInitialLoading ? (
        <div className={styles.largeLoader}></div>
      ) : (
        <>
          {initialError ? (
            <div className={styles.errorContainer}>
              <p className={styles.error}>{initialError}</p>
            </div>
          ) : (
            <>
              <div className={styles.headerContainer}>
                <div className={styles.titleContainer}>
                  {isRenaming ? (
                    <>
                      <form
                        className={styles.formContainer}
                        onSubmit={handleRename}>
                        <input
                          className={styles.renameInput}
                          id="rename"
                          aria-label="Rename Exhibition"
                          autoComplete="off"
                          autoCorrect="off"
                          type="text"
                          placeholder={exhibition.exhibitionName}
                          value={renameInput}
                          onChange={(e) => setRenameInput(e.target.value)}
                          required
                        />

                        <button
                          className={styles.renameSubmitBtn}
                          aria-label="Submit Rename">
                          {"✔"}
                        </button>

                        {isRenameLoading ? (
                          <div
                            className={`${styles.renameLoader} ${styles.loader}`}></div>
                        ) : null}
                      </form>

                      <button
                        className={styles.cancelBtn}
                        aria-label="Cancel Rename"
                        onClick={() => setIsRenaming(!isRenaming)}
                        disabled={isDeleteLoading || isRenameLoading}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className={styles.title}>
                        {exhibition.exhibitionName}
                      </h2>

                      <button
                        className={styles.renameBtn}
                        aria-label="Rename the exhibition"
                        onClick={() => setIsRenaming(!isRenaming)}
                        hidden={isDeletionSuccess ? true : false}>
                        Rename
                      </button>
                    </>
                  )}
                </div>

                <div className={styles.btnContainer}>
                  <button
                    className={styles.backBtn}
                    aria-label="Back to previous page"
                    onClick={() => navigate(-1)}
                    disabled={isDeleteLoading}>
                    Back
                  </button>

                  {isDeleteLoading ? (
                    <div className={styles.loader}></div>
                  ) : (
                    <button
                      className={styles.deleteBtn}
                      aria-label="Delete the exhibition"
                      onClick={handleDelete}
                      hidden={isDeletionSuccess}>
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {queryError ? <p className={styles.error}>{queryError}</p> : null}

              {isDeletionSuccess ? (
                <div>
                  <p className={styles.prompt}>Successfully Deleted</p>
                </div>
              ) : (
                <ul className={styles.listContainer}>
                  {exhibition.artefacts.map(
                    (artefact: { collection: string; id: number }, id: any) => {
                      return (
                        <li key={id}>
                          <EntrySelecter entry={artefact} />
                        </li>
                      );
                    }
                  )}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

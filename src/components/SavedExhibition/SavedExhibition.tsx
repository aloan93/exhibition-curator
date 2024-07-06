import { ReactNode, useEffect, useState } from "react";
import styles from "./SavedExhibition.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EntrySelecter from "../MyExhibition/EntrySelecter";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function SavedExhibition(): ReactNode {
  const { exhibitionName } = useParams();
  const location = useLocation();
  const exhibition = JSON.parse(location.state) || null;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletionError, setDeletionError] = useState("");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState("");

  useEffect(() => {
    if (exhibition) {
      setIsLoading(true);
      setError("");
      getDoc(doc(db, "Exhibitions", exhibition.exhibitionId))
        .then((res) => {
          res.exists() ? null : setError("Exhibition not found");
          setIsLoading(false);
        })
        .catch(() => {
          setError("Something went wrong. Please try again later");
          setIsLoading(false);
        });
    } else navigate("/notfound", { replace: true });
  }, []);

  function handleDelete(e: any) {
    e.preventDefault();
    setIsDeleteLoading(true);
    setDeletionSuccess("");
    setDeletionError("");
    deleteDoc(doc(db, "Exhibitions", exhibition.exhibitionId))
      .then(() => {
        setDeletionSuccess("Successfully Deleted");
        setIsDeleteLoading(false);
      })
      .catch(() => {
        setDeletionError("Failed to delete exhibition. Please try again later");
        setIsDeleteLoading(false);
      });
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.largeLoader}></div>
      ) : (
        <>
          {error ? (
            <div className={styles.errorContainer}>
              <p className={styles.error}>{error}</p>
            </div>
          ) : (
            <>
              <div className={styles.titleContainer}>
                <h2 className={styles.title}>{exhibitionName}</h2>

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
                      hidden={deletionSuccess ? true : false}>
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {deletionError ? (
                <p className={styles.error}>{deletionError}</p>
              ) : null}

              {deletionSuccess ? (
                <div>
                  <p className={styles.prompt}>{deletionSuccess}</p>
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

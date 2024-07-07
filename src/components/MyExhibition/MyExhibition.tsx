import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./MyExhibition.module.css";
import useExhibition from "../../hooks/useExhibition";
import EntrySelecter from "./EntrySelecter";
import PageNav from "../PageNav/PageNav";
import useAuth from "../../hooks/useAuth";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function MyExhibition(): ReactNode {
  const { exhibition, setExhibition } = useExhibition();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const paginatedExhibition = exhibition.slice(
    Number(page) * 20 - 20,
    Number(page) * 20
  );
  const resultsTotal = exhibition.length;
  const { currentUser } = useAuth();
  const [exhibitionName, setExhibitionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const exhibitionsRef = collection(db, "Exhibitions");
  const userRef = currentUser ? doc(db, "Users", currentUser.uid) : null;
  const q = query(exhibitionsRef, where("user", "==", userRef));
  const navigate = useNavigate();

  useEffect(() => {
    if (exhibition.length !== 0 && exhibition.length < 20 * Number(page) - 19) {
      setSearchParams((prev) => {
        prev.set("page", String(Number(page) - 1));
        return prev;
      });
    }
  }, [exhibition]);

  function submitSave(e: any) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    getDocs(q)
      .then(({ docs }) => {
        return docs.length;
      })
      .then((userOwnedExhibitions) => {
        if (userOwnedExhibitions < 3) {
          return addDoc(exhibitionsRef, {
            artefacts: [...exhibition],
            exhibitionName,
            user: userRef,
          });
        } else {
          return Promise.reject("Max Reached");
        }
      })
      .then((res) => {
        setExhibition([]);
        setSuccess(`${res.id}`);
        setIsLoading(false);
      })
      .catch((err) => {
        err === "Max Reached"
          ? setError("Maximum saved exhibitions of 3 reached")
          : setError("Something went wrong. Please try again later");
        setIsLoading(false);
      });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Exhibiton</h2>
      {isLoading ? (
        <div className={styles.largeLoader} aria-label="Loading"></div>
      ) : (
        <>
          {exhibition.length > 0 ? (
            <>
              {currentUser ? (
                <form className={styles.formContainer} onSubmit={submitSave}>
                  <input
                    className={styles.saveInput}
                    type="text"
                    aria-label="Save Exhibition Name Input"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Exhibition Name"
                    onChange={(e) => setExhibitionName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button className={styles.saveBtn} disabled={isLoading}>
                    Save
                  </button>
                </form>
              ) : null}

              {error ? <p className={styles.error}>{error}</p> : null}

              <PageNav
                page={page}
                setSearchParams={setSearchParams}
                resultsTotal={resultsTotal}
                hideText={false}
              />
            </>
          ) : (
            <>
              {success ? (
                <>
                  <p
                    className={
                      styles.prompt
                    }>{`Successfully saved the exhibition as "${exhibitionName}"`}</p>
                  <button
                    className={styles.profileBtn}
                    aria-label="Go to saved exhibition"
                    onClick={() => navigate(`/profile/${success}`)}>
                    View Exhibition
                  </button>
                </>
              ) : (
                <p className={styles.prompt}>
                  {
                    "No artefacts currently in this exhibition - Try adding some!"
                  }
                </p>
              )}
            </>
          )}
          <ul className={styles.listContainer}>
            {paginatedExhibition.map((entry) => {
              return (
                <li key={`${entry.collection} - ${entry.id}`}>
                  <EntrySelecter entry={entry} />
                </li>
              );
            })}
          </ul>

          {exhibition.length > 0 ? (
            <PageNav
              page={page}
              setSearchParams={setSearchParams}
              resultsTotal={resultsTotal}
              hideText={true}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

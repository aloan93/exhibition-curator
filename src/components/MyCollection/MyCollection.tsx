import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./MyCollection.module.css";
import useCollection from "../../hooks/useCollection";
import EntrySelecter from "./EntrySelecter";
import PageNav from "../PageNav/PageNav";
import useAuth from "../../hooks/useAuth";
import {
  doc,
  collection as fbCollection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function MyCollection(): ReactNode {
  const { collection, setCollection } = useCollection();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const paginatedExhibition = collection.slice(
    Number(page) * 20 - 20,
    Number(page) * 20
  );
  const resultsTotal = collection.length;
  const { currentUser } = useAuth();
  const [exhibitionName, setExhibitionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const exhibitionsRef = fbCollection(db, "Exhibitions");
  const userRef = currentUser ? doc(db, "Users", currentUser.uid) : null;
  const q = query(exhibitionsRef, where("user", "==", userRef));
  const navigate = useNavigate();

  useEffect(() => {
    if (collection.length !== 0 && collection.length < 20 * Number(page) - 19) {
      setSearchParams((prev) => {
        prev.set("page", String(Number(page) - 1));
        return prev;
      });
    }
  }, [collection]);

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
            artefacts: [...collection],
            exhibitionName,
            user: userRef,
          });
        } else {
          return Promise.reject("Max Reached");
        }
      })
      .then((res) => {
        setCollection([]);
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
      <h2 className={styles.title}>My Collection</h2>
      {isLoading ? (
        <div className={styles.largeLoader} aria-label="Loading"></div>
      ) : (
        <>
          {collection.length > 0 ? (
            <>
              {currentUser ? (
                <form className={styles.formContainer} onSubmit={submitSave}>
                  <input
                    className={styles.saveInput}
                    type="text"
                    aria-label="Save exhibition name input"
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
              ) : (
                <p className={styles.altLink}>
                  <Link to="/login">Login</Link> or{" "}
                  <Link to="/signup">Signup</Link> to save this collection as an
                  exhibition
                </p>
              )}

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
                    className={styles.redirectBtn}
                    aria-label="Go to saved exhibition"
                    onClick={() => navigate(`/profile/${success}`)}>
                    View Exhibition
                  </button>
                </>
              ) : (
                <>
                  <p className={styles.prompt}>
                    {
                      "No artefacts currently in your collection - Try browsing the museum collections and adding some!"
                    }
                  </p>

                  <button
                    className={styles.redirectBtn}
                    aria-label="Go to museum collections"
                    onClick={() => navigate("/museum-collections")}>
                    To Museum Collections
                  </button>
                </>
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

          {collection.length > 0 ? (
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

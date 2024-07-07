import { ReactNode, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { db } from "../../firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function SavedExhibitions(props: { uid: string }): ReactNode {
  const [userExhibitions, setUserExhibitions] = useState<any[]>([]);
  const exhibitionsRef = collection(db, "Exhibitions");
  const userRef = doc(db, "Users", props.uid);
  const q = query(exhibitionsRef, where("user", "==", userRef));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    getDocs(q)
      .then(({ docs }) => {
        const newData = docs.map((doc) => ({
          ...doc.data(),
          exhibitionId: doc.id,
        }));
        setUserExhibitions(newData);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to retreive exhibition. Please try again later");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.exhibitionsContainer}>
      <h2
        className={
          styles.exhibitionsTitle
        }>{`Saved Exhibitions (${userExhibitions.length}/3)`}</h2>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          {error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <>
              {userExhibitions.length > 0 ? (
                <ul className={styles.exhibitionsList}>
                  {userExhibitions.map((exhibition, id) => {
                    return (
                      <li key={id} className={styles.exhibitionItem}>
                        <h3 className={styles.exhibitionTitle}>
                          <Link
                            to={`/profile/${exhibition.exhibitionId}`}>{`${exhibition.exhibitionName} (${exhibition.artefacts.length})`}</Link>
                        </h3>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className={styles.prompt}>
                  ...would be here, if you had any
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

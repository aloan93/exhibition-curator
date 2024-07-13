import { ReactNode, useEffect, useState } from "react";
import styles from "./SavedExhibitions.module.css";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SavedExhibitions(): ReactNode {
  const { currentUser } = useAuth();
  const [userExhibitions, setUserExhibitions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";

  useEffect(() => {
    !currentUser ? navigate(from, { replace: true }) : null;
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return navigate(from, { replace: true });
    else {
      const exhibitionsRef = collection(db, "Exhibitions");
      const userRef = doc(db, "Users", currentUser.uid);
      const q = query(exhibitionsRef, where("user", "==", userRef));

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
          setError("Failed to retreive exhibitions. Please try again later");
          setIsLoading(false);
        });
    }
  }, [currentUser]);

  return (
    <div className={styles.container}>
      <h2
        className={
          styles.title
        }>{`Saved Exhibitions (${userExhibitions.length}/3)`}</h2>

      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          {error ? (
            <div className={styles.errorContainer}>
              <p className={styles.error}>{error}</p>
            </div>
          ) : (
            <>
              {userExhibitions.length > 0 ? (
                <ul className={styles.exhibitionsList}>
                  {userExhibitions.map((exhibition, id) => {
                    return (
                      <li key={id} className={styles.exhibitionItem}>
                        <h3 className={styles.exhibitionTitle}>
                          <Link
                            to={`/saved-exhibitions/${exhibition.exhibitionId}`}>{`${exhibition.exhibitionName} (${exhibition.artefacts.length})`}</Link>
                        </h3>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <>
                  <p className={styles.prompt}>
                    ...would be here, if you had any
                  </p>

                  <p className={styles.prompt}>
                    You can save any populated collection as an Exhibition!
                  </p>

                  <button
                    className={styles.redirectBtn}
                    aria-label="Go to My Collection"
                    onClick={() => navigate("/my-collection")}>
                    To My Collection
                  </button>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

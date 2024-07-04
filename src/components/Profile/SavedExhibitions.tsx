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

  useEffect(() => {
    getDocs(q)
      .then(({ docs }) => {
        const newData = docs.map((doc) => ({
          ...doc.data(),
          exhibitionId: doc.id,
        }));
        setUserExhibitions(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.exhibitionsContainer}>
      {userExhibitions.length > 0 ? (
        <>
          <h2 className={styles.exhibitionsTitle}>Saved Exhibitions</h2>
          <ul className={styles.exhibitionsList}>
            {userExhibitions.map((exhibition, id) => {
              return (
                <li key={id} className={styles.exhibitionItem}>
                  <h3 className={styles.exhibitionTitle}>
                    <Link
                      to={`/profile/${exhibition.exhibitionName}`}
                      state={
                        exhibition.artefacts
                      }>{`${exhibition.exhibitionName} (${exhibition.artefacts.length})`}</Link>
                  </h3>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </div>
  );
}

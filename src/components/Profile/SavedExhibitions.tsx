import { ReactNode, useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

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
    <ul>
      {userExhibitions.map((exhibition, id) => {
        return (
          <li key={id}>
            <h3>{exhibition.exhibitionName}</h3>
            {exhibition.artefacts.map((artefact: any, id: any) => {
              return (
                <p key={id}>{`${artefact.collection} - ${artefact.id}`}</p>
              );
            })}
          </li>
        );
      })}
    </ul>
  );
}

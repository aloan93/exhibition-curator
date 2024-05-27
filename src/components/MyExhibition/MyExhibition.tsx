import { ReactNode } from "react";
import styles from "./MyExhibition.module.css";
import useExhibition from "../../hooks/useExhibition";

export default function MyExhibition(): ReactNode {
  const { exhibition } = useExhibition();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Exhibiton</h2>
      <ul className={styles.listContainer}>
        {exhibition.map((artefact) => {
          if (artefact.collection === "cleveland")
            return (
              <p key={`${artefact.collection} - ${artefact.id}`}>cleveland</p>
            );
          else if (artefact.collection === "metropolitan")
            return (
              <p key={`${artefact.collection} - ${artefact.id}`}>
                metropolitan
              </p>
            );
        })}
      </ul>
    </div>
  );
}

import { ReactNode } from "react";
import styles from "./MyExhibition.module.css";
import useExhibition from "../../hooks/useExhibition";
import EntrySelecter from "../MyExhibitionEntry/EntrySelecter";

export default function MyExhibition(): ReactNode {
  const { exhibition } = useExhibition();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Exhibiton</h2>
      <ul className={styles.listContainer}>
        {exhibition.map((entry) => {
          return (
            <li key={`${entry.collection} - ${entry.id}`}>
              <EntrySelecter entry={entry} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

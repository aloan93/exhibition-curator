import { ReactNode } from "react";
import styles from "./SavedExhibition.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EntrySelecter from "../MyExhibition/EntrySelecter";

export default function SavedExhibition(): ReactNode {
  const { exhibitionName } = useParams();
  const location = useLocation();
  const artefacts = location.state || 0;
  const navigate = useNavigate();

  if (!artefacts) return null;
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{exhibitionName}</h2>
        <button
          className={styles.backBtn}
          aria-label="Back to previous page"
          onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <ul className={styles.listContainer}>
        {artefacts.map(
          (artefact: { collection: string; id: number }, id: any) => {
            return (
              <li key={id}>
                <EntrySelecter entry={artefact} />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}

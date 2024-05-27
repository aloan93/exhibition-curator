import { ReactNode } from "react";
import styles from "./MyExhibitionEntry.module.css";
import { convertYearToBcOrNot } from "../../utils";

export default function ClevelandEntry(props: { artefact: any }): ReactNode {
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <p className={styles.title}>{props.artefact.title}</p>
        <p
          className={
            styles.details
          }>{`${props.artefact.department} - ${props.artefact.type}`}</p>
        <p className={styles.details}>{props.artefact.culture[0]}</p>
        <p className={styles.details}>{`${convertYearToBcOrNot(
          props.artefact.creation_date_earliest
        )} - ${convertYearToBcOrNot(props.artefact.creation_date_latest)}`}</p>
        <p className={styles.details}>
          {props.artefact.creators[0]?.description}
        </p>
      </div>
      <img
        className={styles.artefactImage}
        src={props.artefact.images.web.url}
        alt="Image of the artefact"
      />
    </div>
  );
}

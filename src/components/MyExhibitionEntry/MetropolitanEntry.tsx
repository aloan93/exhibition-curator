import { ReactNode } from "react";
import styles from "./MyExhibitionEntry.module.css";
import { getImageURL, convertYearToBcOrNot } from "../../utils";

export default function MetropolitanEntry(props: { artefact: any }): ReactNode {
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <p className={styles.title}>{props.artefact.title}</p>
        <p className={styles.details}>{`${props.artefact.department} - ${
          props.artefact.objectName || "Misc."
        }`}</p>
        <p className={styles.details}>{props.artefact.culture}</p>
        {props.artefact.objectBeginDate ? (
          <p className={styles.details}>{`${convertYearToBcOrNot(
            props.artefact.objectBeginDate
          )} - ${convertYearToBcOrNot(props.artefact.objectEndDate)}`}</p>
        ) : null}
        <p className={styles.details}>{props.artefact.artistDisplayName}</p>
        {props.artefact.primaryImageSmall ? null : (
          <p className={styles.noImage}>
            {`Due to rights restrictions images for this artefact are
                unavailable`}
          </p>
        )}
      </div>
      {props.artefact.primaryImageSmall ? (
        <img
          className={styles.artefactImage}
          src={props.artefact.primaryImageSmall}
          alt="Small image of artwork"
        />
      ) : (
        <img
          className={styles.placeholderImage}
          src={getImageURL("placeholder/placeholder.jpg")}
          alt="Placeholder image for artefact due to rights issues"></img>
      )}
    </div>
  );
}

import { ReactNode } from "react";
import styles from "./MuseumCollectionCards.module.css";
import { convertYearToBcOrNot } from "../../utils";

export default function ClevelandMuseumOfArtCard(props: {
  artifact: any;
}): ReactNode {
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <p className={styles.title}>{props.artifact.title}</p>
        <p
          className={
            styles.details
          }>{`${props.artifact.department} - ${props.artifact.type}`}</p>
        <p className={styles.details}>{props.artifact.culture[0]}</p>
        <p className={styles.details}>{`${convertYearToBcOrNot(
          props.artifact.creation_date_earliest
        )} - ${convertYearToBcOrNot(props.artifact.creation_date_latest)}`}</p>
        <p className={styles.details}>
          {props.artifact.creators[0]?.description}
        </p>
      </div>
      <img
        className={styles.artifactImage}
        src={props.artifact.images.web.url}
        alt="Image of the artifact"
      />
    </div>
  );
}

import { ReactNode } from "react";
import styles from "./MyExhibitionEntry.module.css";
import { getImageURL, convertYearToBcOrNot } from "../../utils";
import useExhibition from "../../hooks/useExhibition";
import { Link } from "react-router-dom";

export default function MetropolitanEntry(props: { artefact: any }): ReactNode {
  const { exhibition, setExhibition } = useExhibition();

  function removeFromExhibition(e: any) {
    e.preventDefault();
    setExhibition(
      [...exhibition].filter(
        (a) =>
          a.collection !== "metropolitan" || a.id !== props.artefact.objectID
      )
    );
  }

  return (
    <>
      <div className={styles.detailsContainer}>
        <Link
          to={`/metropolitan-museum-of-art/${props.artefact.objectID}`}
          state={props.artefact}>
          <p className={styles.title}>{props.artefact.title}</p>
        </Link>
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
        <button
          className={styles.removeArtefactBtn}
          onClick={removeFromExhibition}
          hidden={!exhibition.some((e) => e.id === props.artefact.objectID)}>
          Remove from exhibition
        </button>
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
    </>
  );
}

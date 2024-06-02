import { ReactNode } from "react";
import styles from "./MyExhibitionEntry.module.css";
import { getImageURL, convertYearToBcOrNot } from "../../utils";
import useExhibition from "../../hooks/useExhibition";
import { Link } from "react-router-dom";
import ImageLoader from "../ImageLoader/ImageLoader";

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
          className={styles.title}
          to={`/metropolitan-museum-of-art/${props.artefact.objectID}`}
          state={props.artefact}>
          {props.artefact.title}
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

        <p className={styles.noImage}>
          {props.artefact.primaryImageSmall
            ? ""
            : `Images for this artefact are unavailable, this may be due to rights restrictions`}
        </p>

        <button
          className={styles.removeArtefactBtn}
          onClick={removeFromExhibition}
          hidden={!exhibition.some((e) => e.id === props.artefact.objectID)}>
          Remove from exhibition
        </button>
      </div>

      <Link
        className={styles.artefactImageLink}
        to={`/metropolitan-museum-of-art/${props.artefact.objectID}`}
        state={props.artefact}>
        {props.artefact.primaryImageSmall ? (
          <div className={styles.artefactImageContainer}>
            <ImageLoader imageLink={props.artefact.primaryImageSmall} />
          </div>
        ) : (
          <img
            className={styles.placeholderImage}
            src={getImageURL("placeholder/placeholder.jpg")}
            alt="Placeholder image for artefact due to rights issues"></img>
        )}
      </Link>
    </>
  );
}

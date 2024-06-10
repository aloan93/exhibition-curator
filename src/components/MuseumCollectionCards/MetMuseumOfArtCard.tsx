import { ReactNode } from "react";
import styles from "./MuseumCollectionCards.module.css";
import { getImageURL, getDateRangeString } from "../../utils";
import useExhibition from "../../hooks/useExhibition";
import { Link } from "react-router-dom";
import ImageLoader from "../ImageLoader/ImageLoader";

export default function MetMuseumOfArtCard(props: {
  artefact: any;
}): ReactNode {
  const { exhibition, setExhibition } = useExhibition();

  function addToExhibition(e: any) {
    e.preventDefault();
    setExhibition([
      ...exhibition,
      { collection: "metropolitan", id: props.artefact.objectID },
    ]);
  }

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
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <h3 className={styles.title}>
          <Link
            className={styles.titleLink}
            to={`/metropolitan-museum-of-art/${props.artefact.objectID}`}
            state={props.artefact}>
            {props.artefact.title}
          </Link>
        </h3>

        {props.artefact.objectBeginDate ? (
          <p className={`${styles.details} ${styles.date}`}>
            {getDateRangeString(
              props.artefact.objectBeginDate,
              props.artefact.objectEndDate
            )}
          </p>
        ) : null}

        {props.artefact.culture ? (
          <p className={styles.details}>{`${props.artefact.culture}${
            props.artefact.period ? ` - ${props.artefact.period}` : ""
          }`}</p>
        ) : null}

        <p className={styles.details}>{`${
          props.artefact.department || "Dept. unknown"
        } - ${props.artefact.objectName || "Misc."}`}</p>

        {props.artefact.artistDisplayName ? (
          <p className={styles.details}>
            {`${props.artefact.artistDisplayName}${
              props.artefact.artistNationality
                ? ` (${props.artefact.artistNationality}, ${
                    props.artefact.artistBeginDate || "Unknown"
                  }-${props.artefact.artistEndDate || "Unknown"})`
                : ""
            }`}
          </p>
        ) : null}

        <p className={styles.noImage}>
          {props.artefact.primaryImageSmall
            ? ""
            : `Images for this artefact are unavailable, this may be due to rights restrictions`}
        </p>

        <button
          className={styles.addArtefactBtn}
          onClick={addToExhibition}
          hidden={exhibition.some((e) => e.id === props.artefact.objectID)}>
          Add to exhibition
        </button>

        <button
          className={styles.removeArtefactBtn}
          onClick={removeFromExhibition}
          hidden={!exhibition.some((e) => e.id === props.artefact.objectID)}>
          Remove from exhibition
        </button>
      </div>

      <div className={styles.artefactImageContainer}>
        <Link
          className={styles.artefactImageLink}
          to={`/metropolitan-museum-of-art/${props.artefact.objectID}`}
          state={props.artefact}>
          {props.artefact.primaryImageSmall ? (
            <ImageLoader imageLink={props.artefact.primaryImageSmall} />
          ) : (
            <img
              className={styles.placeholderImage}
              src={getImageURL("placeholder/placeholder.jpg")}
              alt="Placeholder image for artefact due to rights issues"
            />
          )}
        </Link>
      </div>
    </div>
  );
}

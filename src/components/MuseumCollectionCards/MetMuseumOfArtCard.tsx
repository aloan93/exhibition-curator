import { ReactNode } from "react";
import styles from "./MuseumCollectionCards.module.css";
import { getImageURL, getDateRangeString } from "../../utils";
import useCollection from "../../hooks/useCollection";
import { Link } from "react-router-dom";
import ImageLoader from "../ImageLoader/ImageLoader";

export default function MetMuseumOfArtCard(props: {
  artefact: any;
}): ReactNode {
  const { collection, setCollection } = useCollection();

  function addToMyCollection(e: any) {
    e.preventDefault();
    setCollection([
      ...collection,
      { collection: "metropolitan", id: props.artefact.objectID },
    ]);
  }

  function removeFromMyCollection(e: any) {
    e.preventDefault();
    setCollection(
      [...collection].filter(
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
            to={`/museum-collections/metropolitan-museum-of-art/${props.artefact.objectID}`}
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
          onClick={addToMyCollection}
          hidden={collection.some((e) => e.id === props.artefact.objectID)}>
          Add to MyCollection
        </button>

        <button
          className={styles.removeArtefactBtn}
          onClick={removeFromMyCollection}
          hidden={!collection.some((e) => e.id === props.artefact.objectID)}>
          Remove from MyCollection
        </button>
      </div>

      <div className={styles.artefactImageContainer}>
        <Link
          className={styles.artefactImageLink}
          to={`/museum-collections/metropolitan-museum-of-art/${props.artefact.objectID}`}
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

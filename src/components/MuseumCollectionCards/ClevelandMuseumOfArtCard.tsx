import { ReactNode } from "react";
import styles from "./MuseumCollectionCards.module.css";
import { getDateRangeString } from "../../utils";
import useExhibition from "../../hooks/useExhibition";
import { Link } from "react-router-dom";
import ImageLoader from "../ImageLoader/ImageLoader";

export default function ClevelandMuseumOfArtCard(props: {
  artefact: any;
}): ReactNode {
  const { exhibition, setExhibition } = useExhibition();

  function addToMyCollection(e: any) {
    e.preventDefault();
    setExhibition([
      ...exhibition,
      { collection: "cleveland", id: props.artefact.id },
    ]);
  }

  function removeFromMyCollection(e: any) {
    e.preventDefault();
    setExhibition(
      [...exhibition].filter(
        (a) => a.collection !== "cleveland" || a.id !== props.artefact.id
      )
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <h3 className={styles.title}>
          <Link
            className={styles.titleLink}
            to={`/museum-collections/cleveland-museum-of-art/${props.artefact.id}`}
            state={props.artefact}>
            {props.artefact.title}
          </Link>
        </h3>

        {props.artefact.creation_date_earliest ? (
          <p className={`${styles.details} ${styles.date}`}>
            {getDateRangeString(
              props.artefact.creation_date_earliest,
              props.artefact.creation_date_latest
            )}
          </p>
        ) : null}

        {props.artefact.culture[0] ? (
          <p className={styles.details}>{props.artefact.culture[0]}</p>
        ) : null}

        <p className={styles.details}>{`${
          props.artefact.department || "Dept. unknown"
        } - ${props.artefact.type || "Misc."}`}</p>

        {props.artefact.creators[0] ? (
          <p className={styles.details}>
            {props.artefact.creators[0]?.description}
          </p>
        ) : null}

        <p className={styles.noImage}></p>

        <button
          className={styles.addArtefactBtn}
          onClick={addToMyCollection}
          hidden={exhibition.some((e) => e.id === props.artefact.id)}>
          Add to My Collection
        </button>

        <button
          className={styles.removeArtefactBtn}
          onClick={removeFromMyCollection}
          hidden={!exhibition.some((e) => e.id === props.artefact.id)}>
          Remove from My Collection
        </button>
      </div>

      <div className={styles.artefactImageContainer}>
        <Link
          className={styles.artefactImageLink}
          to={`/museum-collections/cleveland-museum-of-art/${props.artefact.id}`}
          state={props.artefact}>
          <ImageLoader imageLink={props.artefact.images.web.url} />
        </Link>
      </div>
    </div>
  );
}

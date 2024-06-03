import { ReactNode } from "react";
import styles from "./MyExhibitionEntry.module.css";
import { getDateRangeString } from "../../utils";
import useExhibition from "../../hooks/useExhibition";
import { Link } from "react-router-dom";
import ImageLoader from "../ImageLoader/ImageLoader";

export default function ClevelandEntry(props: { artefact: any }): ReactNode {
  const { exhibition, setExhibition } = useExhibition();

  function removeFromExhibition(e: any) {
    e.preventDefault();
    setExhibition(
      [...exhibition].filter(
        (a) => a.collection !== "cleveland" || a.id !== props.artefact.id
      )
    );
  }

  return (
    <>
      <div className={styles.detailsContainer}>
        <Link
          className={styles.title}
          to={`/cleveland-museum-of-art/${props.artefact.id}`}
          state={props.artefact}>
          {props.artefact.title}
        </Link>

        {props.artefact.creation_date_earliest ? (
          <p className={styles.details}>
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
          className={styles.removeArtefactBtn}
          onClick={removeFromExhibition}
          hidden={!exhibition.some((e) => e.id === props.artefact.id)}>
          Remove from exhibition
        </button>
      </div>

      <Link
        className={styles.artefactImageLink}
        to={`/cleveland-museum-of-art/${props.artefact.id}`}
        state={props.artefact}>
        <div className={styles.artefactImageContainer}>
          <ImageLoader imageLink={props.artefact.images.web.url} />
        </div>
      </Link>
    </>
  );
}

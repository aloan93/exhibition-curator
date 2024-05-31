import { ReactNode } from "react";
import styles from "./MyExhibitionEntry.module.css";
import { convertYearToBcOrNot } from "../../utils";
import useExhibition from "../../hooks/useExhibition";
import { Link } from "react-router-dom";

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

        <p
          className={
            styles.details
          }>{`${props.artefact.department} - ${props.artefact.type}`}</p>

        <p className={styles.details}>{props.artefact.culture[0]}</p>

        {props.artefact.creation_date_earliest ? (
          <p className={styles.details}>{`${convertYearToBcOrNot(
            props.artefact.creation_date_earliest
          )} - ${convertYearToBcOrNot(
            props.artefact.creation_date_latest
          )}`}</p>
        ) : null}

        <p className={styles.details}>
          {props.artefact.creators[0]?.description}
        </p>

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
        <img
          className={styles.artefactImage}
          src={props.artefact.images.web.url}
          alt="Image of the artefact"
        />
      </Link>
    </>
  );
}

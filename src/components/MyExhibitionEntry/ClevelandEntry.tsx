import { ReactNode } from "react";
import styles from "./MyExhibitionEntry.module.css";
import { convertYearToBcOrNot } from "../../utils";
import useExhibition from "../../hooks/useExhibition";
import { Link, useNavigate } from "react-router-dom";

export default function ClevelandEntry(props: { artefact: any }): ReactNode {
  const { exhibition, setExhibition } = useExhibition();
  const navigate = useNavigate();

  function removeFromExhibition(e: any) {
    e.preventDefault();
    setExhibition(
      [...exhibition].filter(
        (a) => a.collection !== "cleveland" || a.id !== props.artefact.id
      )
    );
  }

  function goToSpotlight(e: any) {
    e.preventDefault();
    navigate(`/cleveland-museum-of-art/${props.artefact.id}`, {
      state: props.artefact,
    });
  }

  return (
    <>
      <div className={styles.detailsContainer}>
        <Link
          to={`/cleveland-museum-of-art/${props.artefact.id}`}
          state={props.artefact}>
          <p className={styles.title}>{props.artefact.title}</p>
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
        <button
          className={styles.removeArtefactBtn}
          onClick={removeFromExhibition}
          hidden={!exhibition.some((e) => e.id === props.artefact.id)}>
          Remove from exhibition
        </button>
      </div>
      <img
        className={styles.artefactImage}
        onClick={goToSpotlight}
        src={props.artefact.images.web.url}
        alt="Image of the artefact"
      />
    </>
  );
}

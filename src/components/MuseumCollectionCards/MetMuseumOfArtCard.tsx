import { ReactNode, useEffect, useState } from "react";
import styles from "./MuseumCollectionCards.module.css";
import { metMuseumAPI } from "../../api/api";
import { getImageURL, getDateRangeString } from "../../utils";
import useExhibition from "../../hooks/useExhibition";
import { Link } from "react-router-dom";
import ImageLoader from "../ImageLoader/ImageLoader";

export default function MetMuseumOfArtCard(props: { id: number }): ReactNode {
  const [artefact, setArtefact] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { exhibition, setExhibition } = useExhibition();

  useEffect(() => {
    setIsLoading(true);
    setError("");
    metMuseumAPI
      .get(`/objects/${props.id}`)
      .then(({ data }) => {
        setArtefact(data);
        setIsLoading(false);
      })
      .catch(({ response: { status } }) => {
        status === 404
          ? setError(
              "Artefact not found! This entry may have been removed from the collection."
            )
          : setError("Something went wrong! Please try again later.");
        setIsLoading(false);
      });
  }, []);

  function addToExhibition(e: any) {
    e.preventDefault();
    setExhibition([
      ...exhibition,
      { collection: "metropolitan", id: props.id },
    ]);
  }

  function removeFromExhibition(e: any) {
    e.preventDefault();
    setExhibition(
      [...exhibition].filter(
        (a) => a.collection !== "metropolitan" || a.id !== props.id
      )
    );
  }

  if (isLoading) return <div className={styles.loader}></div>;
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        {error ? (
          <p className={styles.notFound}>{error}</p>
        ) : (
          <>
            <Link
              className={styles.title}
              to={`/metropolitan-museum-of-art/${props.id}`}
              state={artefact}>
              {artefact?.title}
            </Link>

            {artefact?.objectBeginDate ? (
              <p className={`${styles.details} ${styles.date}`}>
                {getDateRangeString(
                  artefact.objectBeginDate,
                  artefact.objectEndDate
                )}
              </p>
            ) : null}

            {artefact?.culture ? (
              <p className={styles.details}>{`${artefact.culture}${
                artefact.period ? ` - ${artefact.period}` : ""
              }`}</p>
            ) : null}

            <p className={styles.details}>{`${
              artefact?.department || "Dept. unknown"
            } - ${artefact?.objectName || "Misc."}`}</p>

            {artefact?.artistDisplayName ? (
              <p className={styles.details}>
                {`${artefact.artistDisplayName}${
                  artefact.artistNationality
                    ? ` (${artefact.artistNationality}, ${
                        artefact.artistBeginDate || "Unknown"
                      }-${artefact.artistEndDate || "Unknown"})`
                    : ""
                }`}
              </p>
            ) : null}

            <p className={styles.noImage}>
              {artefact?.primaryImageSmall
                ? ""
                : `Images for this artefact are unavailable, this may be due to rights restrictions`}
            </p>

            <button
              className={styles.addArtefactBtn}
              onClick={addToExhibition}
              hidden={exhibition.some((e) => e.id === props.id)}>
              Add to exhibition
            </button>

            <button
              className={styles.removeArtefactBtn}
              onClick={removeFromExhibition}
              hidden={!exhibition.some((e) => e.id === props.id)}>
              Remove from exhibition
            </button>
          </>
        )}
      </div>

      <div className={styles.artefactImageContainer}>
        {error ? null : (
          <Link
            className={styles.artefactImageLink}
            to={`/metropolitan-museum-of-art/${props.id}`}
            state={artefact}>
            {artefact?.primaryImageSmall ? (
              <ImageLoader imageLink={artefact.primaryImageSmall} />
            ) : (
              <img
                className={styles.placeholderImage}
                src={getImageURL("placeholder/placeholder.jpg")}
                alt="Placeholder image for artefact due to rights issues"
              />
            )}
          </Link>
        )}
      </div>
    </div>
  );
}

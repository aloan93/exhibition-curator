import { ReactNode, useEffect, useState } from "react";
import styles from "./MuseumCollectionCards.module.css";
import { metMuseumAPI } from "../../api/api";
import { getImageURL, convertYearToBcOrNot } from "../../utils";
import useExhibition from "../../hooks/useExhibition";

export default function MetMuseumOfArtCard(props: { id: number }): ReactNode {
  type artefactType = {
    title: string;
    primaryImageSmall: string;
    objectName: string;
    department: string;
    culture: string;
    objectBeginDate: number;
    objectEndDate: number;
    artistDisplayName: string;
  };
  const [artefact, setArtefact] = useState<artefactType>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { exhibition, setExhibition } = useExhibition();

  useEffect(() => {
    setIsLoading(true);
    setError("");
    metMuseumAPI
      .get(`/objects/${props.id}`)
      .then(
        ({
          data: {
            title,
            primaryImageSmall,
            objectName,
            department,
            culture,
            objectBeginDate,
            objectEndDate,
            artistDisplayName,
          },
        }) => {
          setArtefact({
            title,
            primaryImageSmall,
            objectName,
            department,
            culture,
            objectBeginDate,
            objectEndDate,
            artistDisplayName,
          });
          setIsLoading(false);
        }
      )
      .catch(({ response: { status } }) => {
        status === 404
          ? setError(
              "artefact not found! This entry may have been removed from the collection."
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

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        {error ? (
          <p className={styles.notFound}>{error}</p>
        ) : (
          <>
            <p className={styles.title}>{artefact?.title}</p>
            <p className={styles.details}>{`${artefact?.department} - ${
              artefact?.objectName || "Misc."
            }`}</p>
            <p className={styles.details}>{artefact?.culture}</p>
            {artefact?.objectBeginDate ? (
              <p className={styles.details}>{`${convertYearToBcOrNot(
                artefact.objectBeginDate
              )} - ${convertYearToBcOrNot(artefact.objectEndDate)}`}</p>
            ) : null}
            <p className={styles.details}>{artefact?.artistDisplayName}</p>
            <button
              className={styles.addArtefactBtn}
              onClick={addToExhibition}
              hidden={exhibition.some((e) => e.id === props.id)}>
              Add to exhibition
            </button>
            {artefact?.primaryImageSmall ? null : (
              <p className={styles.noImage}>
                {`Due to rights restrictions images for this artefact are
                unavailable`}
              </p>
            )}
          </>
        )}
      </div>
      {artefact?.primaryImageSmall ? (
        <img
          className={styles.artefactImage}
          src={artefact.primaryImageSmall}
          alt="Small image of artwork"
        />
      ) : (
        <img
          className={styles.placeholderImage}
          src={getImageURL("placeholder/placeholder.jpg")}
          alt="Placeholder image for artefact due to rights issues"></img>
      )}
    </div>
  );
}

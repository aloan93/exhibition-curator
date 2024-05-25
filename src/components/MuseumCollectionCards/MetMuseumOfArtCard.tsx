import { ReactNode, useEffect, useState } from "react";
import styles from "./MuseumCollectionCards.module.css";
import { metMuseumAPI } from "../../api/api";
import { getImageURL, convertYearToBcOrNot } from "../../utils";

export default function MetMuseumOfArtCard(props: { id: number }): ReactNode {
  type artifactType = {
    title: string;
    primaryImageSmall: string;
    objectName: string;
    department: string;
    culture: string;
    objectBeginDate: number;
    objectEndDate: number;
    artistDisplayName: string;
  };
  const [artifact, setArtifact] = useState<artifactType>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
          setArtifact({
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
              "Artifact not found! This entry may have been removed from the collection."
            )
          : setError("Something went wrong! Please try again later.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        {error ? (
          <p className={styles.notFound}>{error}</p>
        ) : (
          <>
            <p className={styles.title}>{artifact?.title}</p>
            <p className={styles.details}>{`${artifact?.department} - ${
              artifact?.objectName || "Misc."
            }`}</p>
            <p className={styles.details}>{artifact?.culture}</p>
            {artifact?.objectBeginDate ? (
              <p className={styles.details}>{`${convertYearToBcOrNot(
                artifact.objectBeginDate
              )} - ${convertYearToBcOrNot(artifact.objectEndDate)}`}</p>
            ) : null}
            <p className={styles.details}>{artifact?.artistDisplayName}</p>
            {artifact?.primaryImageSmall ? null : (
              <p className={styles.noImage}>
                {`Due to rights restrictions images for this artifact are
                unavailable`}
              </p>
            )}
          </>
        )}
      </div>
      {artifact?.primaryImageSmall ? (
        <img
          className={styles.artifactImage}
          src={artifact.primaryImageSmall}
          alt="Small image of artwork"
        />
      ) : (
        <img
          className={styles.placeholderImage}
          src={getImageURL("placeholder/placeholder.jpg")}
          alt="Placeholder image for artifact due to rights issues"></img>
      )}
    </div>
  );
}

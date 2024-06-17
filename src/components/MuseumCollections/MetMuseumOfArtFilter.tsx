import { ReactNode, useEffect, useState } from "react";
import { metMuseumAPI } from "../../api/api";
import styles from "./MuseumCollections.module.css";
import MetMuseumOfArtCard from "../MuseumCollectionCards/MetMuseumOfArtCard";

export default function MetMuseumOfArtFilter(props: { id: number }): ReactNode {
  const [artefact, setArtefact] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    metMuseumAPI
      .get(`/objects/${props.id}`)
      .then(({ data }) => {
        setArtefact(data);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        response?.status === 404
          ? setError(
              "Artefact not found! This entry may have been removed from the collection."
            )
          : setError("Something went wrong! Please try again later.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return <div className={styles.loader} aria-label="Loading"></div>;
  if (error)
    return (
      <div className={styles.errorContainer}>
        <p className={styles.notFound}>{error}</p>
      </div>
    );
  return <MetMuseumOfArtCard artefact={artefact} />;
}

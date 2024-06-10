import { ReactNode, useEffect, useState } from "react";
import { metMuseumAPI, clevelandMuseumAPI } from "../../api/api";
import styles from "./MyExhibition.module.css";
import ClevelandMuseumOfArtCard from "../MuseumCollectionCards/ClevelandMuseumOfArtCard";
import MetMuseumOfArtCard from "../MuseumCollectionCards/MetMuseumOfArtCard";

type entryType = {
  collection: string;
  id: number;
};

export default function EntrySelecter(props: { entry: entryType }): ReactNode {
  const [artefact, setArtefact] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (props.entry.collection === "cleveland") {
      setIsLoading(true);
      setError("");
      clevelandMuseumAPI
        .get(`/artworks/${props.entry.id}`)
        .then(({ data: { data } }) => {
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
    } else if (props.entry.collection === "metropolitan") {
      setIsLoading(true);
      setError("");
      metMuseumAPI
        .get(`/objects/${props.entry.id}`)
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
    }
  }, []);

  if (isLoading)
    return <div className={styles.loader} aria-label="Loading"></div>;
  if (error)
    return (
      <div className={styles.errorContainer}>
        <p className={styles.notFound}>{error}</p>
      </div>
    );
  return (
    <>
      {props.entry.collection === "cleveland" ? (
        <ClevelandMuseumOfArtCard artefact={artefact} />
      ) : null}
      {props.entry.collection === "metropolitan" ? (
        <MetMuseumOfArtCard artefact={artefact} />
      ) : null}
    </>
  );
}

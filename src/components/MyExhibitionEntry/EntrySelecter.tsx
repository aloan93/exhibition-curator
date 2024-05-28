import { ReactNode, useEffect, useState } from "react";
import { metMuseumAPI, clevelandMuseumAPI } from "../../api/api";
import ClevelandEntry from "./ClevelandEntry";
import MetropolitanEntry from "./MetropolitanEntry";
import styles from "./MyExhibitionEntry.module.css";

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
                "artefact not found! This entry may have been removed from the collection."
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
                "artefact not found! This entry may have been removed from the collection."
              )
            : setError("Something went wrong! Please try again later.");
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) return <div className={styles.loader}></div>;
  return (
    <div className={styles.container}>
      {error ? (
        <p className={styles.notFound}>{error}</p>
      ) : (
        <>
          {props.entry.collection === "cleveland" ? (
            <ClevelandEntry artefact={artefact} />
          ) : null}
          {props.entry.collection === "metropolitan" ? (
            <MetropolitanEntry artefact={artefact} />
          ) : null}
        </>
      )}
    </div>
  );
}

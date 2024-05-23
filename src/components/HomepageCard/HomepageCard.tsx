import { ReactNode, useEffect, useState } from "react";
import styles from "./HomepageCard.module.css";
import { metMuseumAPI } from "../../api/api";
import { getImageURL } from "../../utils";

export default function HomepageCard(props: { id: number }): ReactNode {
  type artifactType = {
    title: string;
    primaryImageSmall: string;
    objectName: string;
  };
  const [artifact, setArtifact] = useState<artifactType>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    metMuseumAPI
      .get(`/objects/${props.id}`)
      .then(({ data: { title, primaryImageSmall, objectName } }) => {
        setArtifact({ title, primaryImageSmall, objectName });
        setIsLoading(false);
      })
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
  if (error) return <p>{error}</p>;
  return (
    <div className={styles.container}>
      <p>{artifact?.title}</p>
      <p>{artifact?.objectName}</p>
      {artifact?.primaryImageSmall ? (
        <img src={artifact.primaryImageSmall} alt="Small image of artwork" />
      ) : (
        <img
          src={getImageURL("placeholder/placeholder.jpg")}
          alt="Placeholder image for artifact due to rights issues"></img>
      )}
    </div>
  );
}

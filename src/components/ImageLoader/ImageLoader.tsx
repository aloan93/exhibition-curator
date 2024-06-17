import { ReactNode, useState } from "react";
import styles from "./ImageLoader.module.css";
import { getImageURL } from "../../utils";

export default function ImageLoader(props: { imageLink: string }): ReactNode {
  const [isLoading, setIsLoading] = useState(true);

  function handleError(e: any) {
    e.target.src = getImageURL("placeholder/placeholder.jpg");
  }

  return (
    <>
      <div
        className={`${styles.loader} ${!isLoading && styles.displayNone}`}
        aria-label="Loading"></div>
      <figure
        className={`${styles.imageContainer} ${
          isLoading && styles.displayNone
        }`}>
        <img
          className={styles.image}
          src={props.imageLink}
          alt="Image of the artefact"
          onLoad={() => setIsLoading(false)}
          onError={handleError}
        />
      </figure>
    </>
  );
}

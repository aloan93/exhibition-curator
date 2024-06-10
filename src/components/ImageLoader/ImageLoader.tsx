import { ReactNode, useState } from "react";
import styles from "./ImageLoader.module.css";

export default function ImageLoader(props: { imageLink: string }): ReactNode {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div
        className={`${styles.loader} ${
          !isLoading && styles.displayNone
        }`}></div>
      <figure
        className={`${styles.imageContainer} ${
          isLoading && styles.displayNone
        }`}>
        <img
          className={styles.image}
          src={props.imageLink}
          alt="Image of the artefact"
          onLoad={() => setIsLoading(false)}
        />
      </figure>
    </>
  );
}

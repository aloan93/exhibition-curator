import { ReactNode, useState } from "react";
import styles from "./ImageLoader.module.css";

export default function ImageLoader(props: {
  imageLink: string;
  setFocusedImage?: React.Dispatch<React.SetStateAction<string>>;
}): ReactNode {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div
        className={`${styles.loader} ${
          !isLoading && styles.displayNone
        }`}></div>
      <figure
        className={`${isLoading && styles.displayNone}`}
        onClick={() =>
          props.setFocusedImage ? props.setFocusedImage(props.imageLink) : null
        }>
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

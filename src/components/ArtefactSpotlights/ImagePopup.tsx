import { ReactNode, useRef, useEffect } from "react";
import styles from "./ArtefactSpotlights.module.css";
import ImageLoader from "../ImageLoader/ImageLoader";

export default function ImagePopup(props: {
  imageLink: string;
  setInspectedImage: React.Dispatch<React.SetStateAction<string>>;
  previousRef: React.RefObject<HTMLDivElement>;
}): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <div
      className={styles.imagePopup}
      tabIndex={0}
      ref={containerRef}
      onClick={() => props.setInspectedImage("")}
      onKeyDown={() => {
        props.setInspectedImage("");
        props.previousRef.current?.focus();
      }}>
      <ImageLoader imageLink={props.imageLink} />
    </div>
  );
}

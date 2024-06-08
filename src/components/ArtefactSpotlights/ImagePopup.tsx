import { ReactNode, useRef, useEffect } from "react";
import styles from "./ArtefactSpotlights.module.css";
import ImageLoader from "../ImageLoader/ImageLoader";

export default function ImagePopup(props: {
  imageLink: string;
  setFocusedImage: React.Dispatch<React.SetStateAction<string>>;
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
      onClick={() => props.setFocusedImage("")}
      onKeyDown={() => props.setFocusedImage("")}>
      <ImageLoader imageLink={props.imageLink} />
    </div>
  );
}

import { ReactNode, useState, useRef } from "react";
import styles from "./ArtefactSpotlights.module.css";
import ImageLoader from "../ImageLoader/ImageLoader";
import ImagePopup from "./ImagePopup";

export default function MainImage(props: { imageLink: string }): ReactNode {
  const [inspectedImage, setInspectedImage] = useState("");
  const mainImageRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={styles.mainImageContainer}
        tabIndex={0}
        ref={mainImageRef}
        onClick={() => setInspectedImage(props.imageLink)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setInspectedImage(props.imageLink);
        }}>
        <ImageLoader imageLink={props.imageLink} />
      </div>
      {inspectedImage ? (
        <ImagePopup
          imageLink={inspectedImage}
          setInspectedImage={setInspectedImage}
          previousRef={mainImageRef}
        />
      ) : null}
    </>
  );
}

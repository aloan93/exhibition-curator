import { ReactNode, useState, useRef } from "react";
import styles from "./ArtefactSpotlights.module.css";
import ImageLoader from "../ImageLoader/ImageLoader";
import ImagePopup from "./ImagePopup";

export default function SpotlightImage(props: {
  imageLink: string;
  style: string;
}): ReactNode {
  const [inspectedImage, setInspectedImage] = useState("");
  const spotlightImageRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={styles[props.style]}
        tabIndex={0}
        ref={spotlightImageRef}
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
          previousRef={spotlightImageRef}
        />
      ) : null}
    </>
  );
}

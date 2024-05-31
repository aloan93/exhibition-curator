import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { metMuseumAPI } from "../../api/api";
import styles from "./ArtefactSpotlights.module.css";
import {
  convertYearToBcOrNot,
  capitaliseString,
  getImageURL,
} from "../../utils";

export default function MetropolitanArtefactSpotlight(): ReactNode {
  const { id } = useParams();
  const location = useLocation();
  const [artefact, setArtefact] = useState(location.state);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [focusedImage, setFocusedImage] = useState("");

  useEffect(() => {
    if (!artefact) {
      setIsLoading(true);
      setError("");
      metMuseumAPI
        .get(`/artworks/${id}`)
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
    } else {
      setError("");
      setIsLoading(false);
    }
  }, []);

  if (error) return <p>{error}</p>;
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          <div className={styles.imagesContainer}>
            {artefact.primaryImageSmall ? (
              <>
                <img
                  className={styles.mainImage}
                  src={artefact.primaryImageSmall}
                  alt="Image of the artefact"
                  onClick={() => setFocusedImage(artefact.primaryImage)}
                />

                <div className={styles.alternateImagesContainer}>
                  {artefact.additionalImages
                    ? artefact.additionalImages.map((image: any) => {
                        return (
                          <img
                            className={styles.alternateImage}
                            src={image}
                            alt="Alternate image of the artefact"
                            onClick={() => setFocusedImage(image)}
                          />
                        );
                      })
                    : null}
                </div>
              </>
            ) : (
              <>
                <img
                  className={styles.placeholderImage}
                  src={getImageURL("placeholder/placeholder.jpg")}
                  alt="Placeholder image"
                />
                <p className={styles.noImage}>
                  {`Due to rights restrictions images for this artefact are
                unavailable`}
                </p>
              </>
            )}
          </div>

          <div className={styles.detailsContainer}>
            <h2 className={styles.title}>{artefact.title}</h2>

            {artefact.objectBeginDate ? (
              <p className={styles.details}>{`${convertYearToBcOrNot(
                artefact.objectBeginDate
              )} - ${convertYearToBcOrNot(artefact.objectEndDate)}`}</p>
            ) : null}

            {artefact.culture ? (
              <p className={styles.details}>{`${artefact.culture}${
                artefact.period ? ` - ${artefact.period}` : ""
              }`}</p>
            ) : null}

            <p className={styles.details}>{`${
              artefact.department || "Dept. unknown"
            } - ${artefact.objectName || "Misc."}`}</p>

            {artefact.medium ? (
              <p className={styles.details}>
                {capitaliseString(artefact.medium)}
              </p>
            ) : null}

            {artefact.artistDisplayName ? (
              <p className={styles.details}>
                {`${artefact.artistDisplayName}${
                  artefact.artistNationality
                    ? ` (${artefact.artistNationality}, ${
                        artefact.artistBeginDate || "Unknown"
                      }-${artefact.artistEndDate || "Unknown"})`
                    : ""
                }`}
              </p>
            ) : null}

            {artefact.objectURL ? (
              <Link
                className={styles.externalLink}
                to={artefact.objectURL}
                target="_blank">
                {`View at metmuseum.org`}
              </Link>
            ) : null}
          </div>
        </>
      )}

      {focusedImage ? (
        <div className={styles.imagePopup} onClick={() => setFocusedImage("")}>
          <img src={focusedImage} alt="Focused image of the artefact" />
        </div>
      ) : null}
    </div>
  );
}

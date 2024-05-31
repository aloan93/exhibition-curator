import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { clevelandMuseumAPI } from "../../api/api";
import styles from "./ArtefactSpotlights.module.css";
import {
  convertYearToBcOrNot,
  capitaliseString,
  getImageURL,
} from "../../utils";

export default function ClevelandArtefactSpotlight(): ReactNode {
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
      clevelandMuseumAPI
        .get(`/artworks/${id}`)
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
            {artefact.images.web.url ? (
              <>
                <img
                  className={styles.mainImage}
                  src={artefact.images.web.url}
                  alt="Image of the artefact"
                  onClick={() => setFocusedImage(artefact.images.print.url)}
                />

                <div className={styles.alternateImagesContainer}>
                  {artefact.alternate_images
                    ? artefact.alternate_images.map((image: any) => {
                        return (
                          <img
                            className={styles.alternateImage}
                            src={image.web.url}
                            alt="Alternate image of the artefact"
                            onClick={() => setFocusedImage(image.print.url)}
                          />
                        );
                      })
                    : null}
                </div>
              </>
            ) : (
              <img
                className={styles.placeholderImage}
                src={getImageURL("/placeholder.placeholder.png")}
                alt="PLaceholder image"
              />
            )}
          </div>

          <div className={styles.detailsContainer}>
            <h2 className={styles.title}>{artefact.title}</h2>

            {artefact.creation_date_earliest ? (
              <p className={styles.details}>{`${convertYearToBcOrNot(
                artefact.creation_date_earliest
              )} - ${convertYearToBcOrNot(artefact.creation_date_latest)}`}</p>
            ) : null}

            {artefact.culture[0] ? (
              <p className={styles.details}>{artefact.culture[0]}</p>
            ) : null}

            <p className={styles.details}>{`${
              artefact.department || "Dept. unknown"
            } - ${artefact.type || "Misc."}`}</p>

            {artefact.technique ? (
              <p className={styles.details}>
                {capitaliseString(artefact.technique)}
              </p>
            ) : null}

            {artefact.creators[0] ? (
              <p className={styles.details}>
                {artefact.creators[0].description}
              </p>
            ) : null}

            {artefact.description ? (
              <p className={styles.details}>{artefact.description}</p>
            ) : null}

            {artefact.did_you_know ? (
              <p className={styles.details}>{artefact.did_you_know}</p>
            ) : null}

            {artefact.url ? (
              <Link
                className={styles.externalLink}
                to={artefact.url}
                target="_blank">
                {`View at clevelandart.org`}
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

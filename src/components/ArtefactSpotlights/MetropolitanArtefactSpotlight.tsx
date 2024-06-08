import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { metMuseumAPI } from "../../api/api";
import styles from "./ArtefactSpotlights.module.css";
import { getDateRangeString, capitaliseString, getImageURL } from "../../utils";
import ImageLoader from "../ImageLoader/ImageLoader";

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
                "Artefact not found! This entry may have been removed from the collection, or does not exist."
              )
            : setError("Something went wrong! Please try again later.");
          setIsLoading(false);
        });
    } else {
      setError("");
      setIsLoading(false);
    }
  }, []);

  if (error)
    return (
      <div className={styles.errorContainer}>
        <p className={styles.notFound}>{error}</p>
      </div>
    );
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          <div className={styles.imagesContainer}>
            {artefact.primaryImage ? (
              <>
                <div
                  className={styles.mainImageContainer}
                  tabIndex={0}
                  onClick={() => setFocusedImage(artefact.primaryImage)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      setFocusedImage(artefact.primaryImage);
                  }}>
                  <ImageLoader imageLink={artefact.primaryImage} />
                </div>

                <div className={styles.alternateImagesContainer}>
                  {artefact.additionalImages
                    ? artefact.additionalImages.map((image: any, id: any) => {
                        return (
                          <div
                            className={styles.alternateImageContainer}
                            key={id}
                            tabIndex={0}
                            onClick={() => setFocusedImage(image)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") setFocusedImage(image);
                            }}>
                            <ImageLoader imageLink={image} />
                          </div>
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
                  {`Images for this artefact are unavailable, this may be due to rights restrictions`}
                </p>
              </>
            )}
          </div>

          <div className={styles.infoContainer}>
            <h2 className={styles.title}>{artefact.title}</h2>

            <div className={styles.detailsContainer}>
              {artefact.objectBeginDate ? (
                <p className={styles.date}>
                  {getDateRangeString(
                    artefact.objectBeginDate,
                    artefact.objectEndDate
                  )}
                </p>
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
                <p className={styles.externalCollection}>
                  <Link
                    className={styles.externalCollectionLink}
                    to={artefact.objectURL}
                    target="_blank">
                    {`View at metmuseum.org`}
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </>
      )}

      {focusedImage ? (
        <div className={styles.imagePopup} onClick={() => setFocusedImage("")}>
          <ImageLoader imageLink={focusedImage} />
        </div>
      ) : null}
    </div>
  );
}

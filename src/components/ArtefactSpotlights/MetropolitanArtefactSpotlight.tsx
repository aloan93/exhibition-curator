import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { metMuseumAPI } from "../../api/api";
import styles from "./ArtefactSpotlights.module.css";
import { getDateRangeString, capitaliseString, getImageURL } from "../../utils";
import SpotlightImage from "./SpotlightImage";
import useExhibition from "../../hooks/useExhibition";

export default function MetropolitanArtefactSpotlight(): ReactNode {
  const { id } = useParams();
  const location = useLocation();
  const [artefact, setArtefact] = useState(location.state);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { exhibition, setExhibition } = useExhibition();

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
        .catch(({ response }) => {
          response?.status === 404
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

  function addToExhibition(e: any) {
    e.preventDefault();
    setExhibition([
      ...exhibition,
      { collection: "metropolitan", id: artefact.objectID },
    ]);
  }

  function removeFromExhibition(e: any) {
    e.preventDefault();
    setExhibition(
      [...exhibition].filter(
        (a) => a.collection !== "metropolitan" || a.id !== artefact.objectID
      )
    );
  }

  if (error)
    return (
      <div className={styles.errorContainer}>
        <p className={styles.notFound}>{error}</p>
        <button
          className={styles.backBtn}
          aria-label="Back to previous page"
          onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loader} aria-label="Loading"></div>
      ) : (
        <>
          <div className={styles.imagesContainer}>
            {artefact.primaryImage ? (
              <>
                <SpotlightImage
                  imageLink={artefact.primaryImage}
                  style="mainImageContainer"
                />

                {artefact.additionalImages ? (
                  <div className={styles.alternateImagesContainer}>
                    {artefact.additionalImages.map((image: any, id: any) => {
                      return (
                        <SpotlightImage
                          key={id}
                          imageLink={image}
                          style="alternateImageContainer"
                        />
                      );
                    })}
                  </div>
                ) : null}
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

              <p className={styles.details}>- - - - - - - - - -</p>

              <p className={styles.details}>
                {artefact.GalleryNumber
                  ? `Displayed at: Gallery No. ${artefact.GalleryNumber}`
                  : "Not currently displayed"}
              </p>

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

              <button
                className={styles.addArtefactBtn}
                onClick={addToExhibition}
                hidden={exhibition.some((e) => e.id === artefact.objectID)}>
                Add to exhibition
              </button>

              <button
                className={styles.removeArtefactBtn}
                onClick={removeFromExhibition}
                hidden={!exhibition.some((e) => e.id === artefact.objectID)}>
                Remove from exhibition
              </button>

              <button
                className={styles.backBtn}
                aria-label="Back to previous page"
                onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

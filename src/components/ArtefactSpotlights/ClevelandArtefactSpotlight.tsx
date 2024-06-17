import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { clevelandMuseumAPI } from "../../api/api";
import styles from "./ArtefactSpotlights.module.css";
import { getDateRangeString, capitaliseString, getImageURL } from "../../utils";
import SpotlightImage from "./SpotlightImage";

export default function ClevelandArtefactSpotlight(): ReactNode {
  const { id } = useParams();
  const location = useLocation();
  const [artefact, setArtefact] = useState(location.state);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!artefact) {
      setIsLoading(true);
      setError("");
      clevelandMuseumAPI
        .get(`/artworks/${id}?indent=1`)
        .then(({ data: { data } }) => {
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
            {artefact.images.web.url ? (
              <>
                <SpotlightImage
                  imageLink={artefact.images.web.url}
                  style="mainImageContainer"
                />

                {artefact.alternate_images ? (
                  <div className={styles.alternateImagesContainer}>
                    {artefact.alternate_images.map((image: any, id: any) => {
                      return (
                        <SpotlightImage
                          key={id}
                          imageLink={image.web.url}
                          style="alternateImageContainer"
                        />
                      );
                    })}
                  </div>
                ) : null}
              </>
            ) : (
              <img
                className={styles.placeholderImage}
                src={getImageURL("/placeholder.placeholder.png")}
                alt="Placeholder image"
              />
            )}
          </div>

          <div className={styles.infoContainer}>
            <h2 className={styles.title}>{artefact.title}</h2>

            <div className={styles.detailsContainer}>
              {artefact.creation_date_earliest ? (
                <p className={styles.date}>
                  {getDateRangeString(
                    artefact.creation_date_earliest,
                    artefact.creation_date_latest
                  )}
                </p>
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
                <p className={styles.description}>{artefact.description}</p>
              ) : null}

              {artefact.did_you_know ? (
                <p className={styles.description}>{artefact.did_you_know}</p>
              ) : null}

              <p className={styles.details}>- - - - - - - - - -</p>

              <p className={styles.details}>
                {artefact.current_location
                  ? `Displayed at: ${artefact.current_location}`
                  : "Not currently displayed"}
              </p>

              {artefact.url ? (
                <p className={styles.externalCollection}>
                  <Link
                    className={styles.externalCollectionLink}
                    to={artefact.url}
                    target="_blank">
                    {`View at clevelandart.org`}
                  </Link>
                </p>
              ) : null}

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

import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { clevelandMuseumAPI } from "../../api/api";
import styles from "./ArtefactSpotlights.module.css";
import { getDateRangeString, capitaliseString, getImageURL } from "../../utils";
import ImageLoader from "../ImageLoader/ImageLoader";

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
            {artefact.images.web.url ? (
              <>
                <div
                  className={styles.mainImageContainer}
                  tabIndex={0}
                  onClick={() => setFocusedImage(artefact.images.web.url)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      setFocusedImage(artefact.images.web.url);
                  }}>
                  <ImageLoader imageLink={artefact.images.web.url} />
                </div>

                <div className={styles.alternateImagesContainer}>
                  {artefact.alternate_images
                    ? artefact.alternate_images.map((image: any, id: any) => {
                        return (
                          <div
                            className={styles.alternateImageContainer}
                            key={id}
                            tabIndex={0}
                            onClick={() =>
                              setFocusedImage(artefact.images.web.url)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter")
                                setFocusedImage(artefact.images.web.url);
                            }}>
                            <ImageLoader imageLink={image.web.url} />
                          </div>
                        );
                      })
                    : null}
                </div>
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
                <p className={styles.details}>{artefact.description}</p>
              ) : null}

              {artefact.did_you_know ? (
                <p className={styles.details}>{artefact.did_you_know}</p>
              ) : null}

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

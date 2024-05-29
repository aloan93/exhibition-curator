import { ReactNode, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { clevelandMuseumAPI } from "../../api/api";

export default function ClevelandArtefactSpotlight(): ReactNode {
  const { id } = useParams();
  const location = useLocation();
  const [artefact, setArtefact] = useState(location.state);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <img src={artefact.images.web.url} alt="" />
    </div>
  );
}

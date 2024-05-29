import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

export default function ClevelandArtefactSpotlight(): ReactNode {
  const location = useLocation();
  const artefact = location.state;

  // logic to call to the api should artefact be null

  return (
    <div>
      <img src={artefact.images.web.url} alt="" />
    </div>
  );
}

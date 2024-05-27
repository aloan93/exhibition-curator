import { ReactNode, useEffect, useState } from "react";
import { metMuseumAPI, clevelandMuseumAPI } from "../../api/api";
import ClevelandEntry from "./ClevelandEntry";
import MetropolitanEntry from "./MetropolitanEntry";

type entryType = {
  collection: string;
  id: number;
};

export default function EntrySelecter(props: { entry: entryType }): ReactNode {
  const [artefact, setArtefact] = useState<any>();

  useEffect(() => {
    if (props.entry.collection === "cleveland") {
      clevelandMuseumAPI
        .get(`/artworks/${props.entry.id}`)
        .then(({ data: { data } }) => {
          setArtefact(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (props.entry.collection === "metropolitan") {
      metMuseumAPI
        .get(`/objects/${props.entry.id}`)
        .then(({ data }) => {
          setArtefact(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  if (artefact) {
    if (props.entry.collection === "cleveland")
      return <ClevelandEntry artefact={artefact} />;
    else if (props.entry.collection === "metropolitan")
      return <MetropolitanEntry artefact={artefact} />;
  }
  return null;
}

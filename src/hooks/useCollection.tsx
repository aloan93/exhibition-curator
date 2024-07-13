import { useContext } from "react";
import { CollectionContext } from "../contexts/CollectionProvider";

export default function useCollection() {
  return useContext(CollectionContext);
}

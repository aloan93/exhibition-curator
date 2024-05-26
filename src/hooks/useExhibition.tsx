import { useContext } from "react";
import { ExhibitionContext } from "../contexts/ExhibitionProvider";

export default function useExhibition() {
  return useContext(ExhibitionContext);
}

import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./MuseumCollections.module.css";
import { metMuseumAPI } from "../../api/api";
import SearchBar from "../SearchBar/SearchBar";
import MetMuseumOfArtCard from "../MuseumCollectionCards/MetMuseumOfArtCard";
import PageNav from "../PageNav/PageNav";
import useExhibition from "../../hooks/useExhibition";

export default function MetMuseumOfArt(): ReactNode {
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [resultsTotal, setResultsTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  const paginatedSearchResults = searchResults.slice(
    Number(page) * 20 - 20,
    Number(page) * 20
  );
  const { exhibition } = useExhibition();

  useEffect(() => {
    console.log(exhibition);
    if (query) {
      setIsLoading(true);
      setError("");
      metMuseumAPI
        .get(`/search?q=${query}&hasImages=true`)
        .then(({ data: { total, objectIDs } }) => {
          !objectIDs ? setSearchResults([]) : setSearchResults(objectIDs);
          setResultsTotal(total);
          setIsLoading(false);
        })
        .catch((err) => {
          setError("Something went wrong. Please try again later.");
          setIsLoading(false);
          console.log(err);
        });
    } else {
      setSearchResults([]);
      setResultsTotal(0);
    }
  }, [query]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Metropolitan Museum of Art Collection</h2>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          <SearchBar setSearchParams={setSearchParams} />
          {error ? <p>{error}</p> : null}
          {searchResults.length > 0 ? (
            <PageNav
              page={page}
              setSearchParams={setSearchParams}
              resultsTotal={resultsTotal}
              hideText={false}
            />
          ) : null}
          <ul className={styles.listContainer}>
            {paginatedSearchResults.map((id) => {
              return (
                <li key={id}>
                  <MetMuseumOfArtCard id={id} />
                </li>
              );
            })}
          </ul>
          {searchResults.length > 0 ? (
            <PageNav
              page={page}
              setSearchParams={setSearchParams}
              resultsTotal={resultsTotal}
              hideText={true}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

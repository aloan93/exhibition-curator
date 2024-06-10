import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./MuseumCollections.module.css";
import { metMuseumAPI } from "../../api/api";
import SearchBar from "../SearchBar/SearchBar";
import PageNav from "../PageNav/PageNav";
import MetMuseumOfArtFilter from "./MetMuseumOfArtFilter";

export default function MetMuseumOfArt(): ReactNode {
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [resultsTotal, setResultsTotal] = useState(0);
  const [prompt, setPrompt] = useState(
    "~ Enter search criteria above to query the art collection ~"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  const paginatedSearchResults = searchResults.slice(
    Number(page) * 20 - 20,
    Number(page) * 20
  );

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setError("");
      metMuseumAPI
        .get(`/search?isOnView=true&hasImages=true&q=${query}`)
        .then(({ data: { total, objectIDs } }) => {
          !objectIDs ? setSearchResults([]) : setSearchResults(objectIDs);
          setResultsTotal(total);
          total === 0
            ? setPrompt("No matching results found :(")
            : setPrompt("");
          setIsLoading(false);
        })
        .catch((err) => {
          setError("Something went wrong. Please try again later.");
          setPrompt("");
          setIsLoading(false);
          console.log(err);
        });
    } else {
      setSearchResults([]);
      setResultsTotal(0);
      setPrompt("~ Enter search criteria above to query the art collection ~");
    }
  }, [query]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Metropolitan Museum of Art Collection</h2>
      {isLoading ? (
        <div className={styles.loader} aria-label="Loading"></div>
      ) : (
        <>
          <SearchBar setSearchParams={setSearchParams} />
          {error ? <p>{error}</p> : null}
          {prompt ? <p className={styles.prompt}>{prompt}</p> : null}
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
                  <MetMuseumOfArtFilter id={id} />
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

import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./MuseumCollections.module.css";
import { clevelandMuseumAPI } from "../../api/api";
import SearchBar from "../SearchBar/SearchBar";
import PageNav from "../PageNav/PageNav";
import ClevelandMuseumOfArtCard from "../MuseumCollectionCards/ClevelandMuseumOfArtCard";

export default function ClevelandMuseumOfArt(): ReactNode {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchResultsTotal, setSearchResultsTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setError("");
      clevelandMuseumAPI
        .get(
          `/artworks/?q=${query}&has_image=1&limit=20&skip=${
            (Number(page) - 1) * 20
          }`
        )
        .then(
          ({
            data: {
              data,
              info: { total },
            },
          }) => {
            !data ? setSearchResults([]) : setSearchResults(data);
            setSearchResultsTotal(total);
            setIsLoading(false);
          }
        )
        .catch((err) => {
          setError("Something went wrong. Please try again later.");
          setIsLoading(false);
          console.log(err);
        });
    } else {
      setSearchResults([]);
      setSearchResultsTotal(0);
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cleveland Museum of Art Collection</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <SearchBar setSearchParams={setSearchParams} />
          {error ? <p>{error}</p> : null}
          {searchResults.length > 0 ? (
            <PageNav
              page={page}
              setSearchParams={setSearchParams}
              searchResultsTotal={searchResultsTotal}
            />
          ) : null}
          <div className={styles.listContainer}>
            {searchResults.map((artifact) => {
              return (
                <ClevelandMuseumOfArtCard
                  key={artifact.id}
                  artifact={artifact}
                />
              );
            })}
          </div>
          {searchResults.length > 0 ? (
            <PageNav
              page={page}
              setSearchParams={setSearchParams}
              searchResultsTotal={searchResultsTotal}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

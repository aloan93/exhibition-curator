import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Homepage.module.css";
import { metMuseumAPI } from "../../api/api";
import SearchBar from "../SearchBar/SearchBar";
import HomepageCard from "../HomepageCard/HomepageCard";
import PageNav from "../PageNav/PageNav";

export default function Homepage(): ReactNode {
  const [searchResults, setSearchResults] = useState<number[]>([]);
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
      metMuseumAPI
        .get(`/search?q=${query}`)
        .then(({ data: { total, objectIDs } }) => {
          !objectIDs ? setSearchResults([]) : setSearchResults(objectIDs);
          setSearchResultsTotal(total);
          setIsLoading(false);
        })
        .catch((err) => {
          setError("Something went wrong. Please try again later.");
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <SearchBar setSearchParams={setSearchParams} />
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>{error}</p> : null}
      <PageNav
        page={page}
        setSearchParams={setSearchParams}
        searchResultsTotal={searchResultsTotal}
      />
      {searchResults.map((id) => {
        return <HomepageCard key={id} id={id} />;
      })}
    </div>
  );
}

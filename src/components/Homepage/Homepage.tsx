import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Homepage.module.css";
import { metMuseumAPI } from "../../api/api";
import SearchBar from "../SearchBar/SearchBar";

export default function Homepage(): ReactNode {
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setError("");
      metMuseumAPI
        .get(`/search?q=${query}`)
        .then(({ data: { total, objectIDs } }) => {
          !objectIDs ? setSearchResults([]) : setSearchResults(objectIDs);
          setIsLoading(false);
          console.log(total);
        })
        .catch((err) => {
          setError("Something went wrong. Please try again later.");
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [searchParams]);

  return (
    <div className={styles.homepage}>
      <SearchBar setSearchParams={setSearchParams} />
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>{error}</p> : null}
      {searchResults.map((id) => {
        return <p key={id}>{id}</p>;
      })}
    </div>
  );
}

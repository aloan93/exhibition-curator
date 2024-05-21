import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Homepage.module.css";
import { metMuseumAPI } from "../../api/api";
import SearchBar from "../SearchBar/SearchBar";

export default function Homepage(): ReactNode {
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query)
      metMuseumAPI
        .get(`/search?q=${query}`)
        .then(({ data: { total, objectIDs } }) => {
          setSearchResults(objectIDs);
          console.log(total);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [searchParams]);

  return (
    <div className={styles.homepage}>
      <SearchBar setSearchParams={setSearchParams} />
      {searchResults.map((id) => {
        return <p>{id}</p>;
      })}
    </div>
  );
}

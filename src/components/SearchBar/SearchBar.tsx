import { ReactNode, useState } from "react";
import { SetURLSearchParams } from "react-router-dom";
import styles from "./SearchBar.module.css";

export default function SearchBar(props: {
  setSearchParams: SetURLSearchParams;
  currentQuery: string;
}): ReactNode {
  const [search, setSearch] = useState("");

  function submitSearch(e: any) {
    e.preventDefault();
    props.setSearchParams((prev) => {
      prev.set("query", search);
      prev.delete("page");
      return prev;
    });
  }

  function submitClear(e: any) {
    e.preventDefault();
    props.setSearchParams((prev) => {
      prev.delete("query");
      prev.delete("page");
      return prev;
    });
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={submitSearch}>
        <input
          className={styles.searchInput}
          id="search"
          aria-label="Search"
          autoComplete="off"
          autoCorrect="off"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          required
        />
        <button className={styles.searchBtn} aria-label="Search">
          {"🔍"}
        </button>
      </form>
      {props.currentQuery ? (
        <div className={styles.queryContainer}>
          <p
            className={
              styles.currentQuery
            }>{`Current query - ${props.currentQuery}`}</p>
          <button
            className={styles.clearBtn}
            aria-label="Clear query"
            onClick={submitClear}>
            Clear
          </button>
        </div>
      ) : null}
    </div>
  );
}

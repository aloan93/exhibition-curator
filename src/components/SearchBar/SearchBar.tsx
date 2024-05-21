import { ReactNode, useState } from "react";
import { SetURLSearchParams } from "react-router-dom";

export default function SearchBar(props: {
  setSearchParams: SetURLSearchParams;
}): ReactNode {
  const [search, setSearch] = useState("");

  function submitSearch(e: any) {
    e.preventDefault();
    props.setSearchParams((prev) => {
      prev.set("query", search);
      return prev;
    });
  }

  return (
    <form onSubmit={submitSearch}>
      <label htmlFor="searchInput">Search Met Museum: </label>
      <input
        type="text"
        id="searchInput"
        onChange={(e) => setSearch(e.target.value)}
        required
      />
      <button>{">>"}</button>
    </form>
  );
}

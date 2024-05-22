import { ReactNode } from "react";
import { SetURLSearchParams } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav(props: {
  page: string;
  setSearchParams: SetURLSearchParams;
  searchResultsTotal: number;
}): ReactNode {
  const pageNumber = Number(props.page);

  function pageDown(e: any) {
    e.preventDefault();
    props.setSearchParams((prev) => {
      prev.set("page", String(pageNumber - 1));
      return prev;
    });
  }

  function pageUp(e: any) {
    e.preventDefault();
    props.setSearchParams((prev) => {
      prev.set("page", String(pageNumber + 1));
      return prev;
    });
  }

  return (
    <div className={styles.container}>
      <button onClick={pageDown} hidden={pageNumber === 1}>
        {"<"}
      </button>
      <p>{pageNumber}</p>
      <button
        onClick={pageUp}
        hidden={pageNumber * 20 >= props.searchResultsTotal}>
        {">"}
      </button>
    </div>
  );
}

import { ReactNode } from "react";
import { SetURLSearchParams } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav(props: {
  page: string;
  setSearchParams: SetURLSearchParams;
  resultsTotal: number;
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
      <button
        className={styles.navBtn}
        onClick={pageDown}
        hidden={pageNumber === 1}>
        {"<<"}
      </button>
      <p className={styles.currentPage}>{pageNumber}</p>
      <button
        className={styles.navBtn}
        onClick={pageUp}
        hidden={pageNumber * 20 >= props.resultsTotal}>
        {">>"}
      </button>
    </div>
  );
}

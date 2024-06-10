import { ReactNode } from "react";
import { SetURLSearchParams } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav(props: {
  page: string;
  setSearchParams: SetURLSearchParams;
  resultsTotal: number;
  hideText: boolean;
}): ReactNode {
  const pageNumber = Number(props.page);
  const currentlyShown = `Showing results ${pageNumber * 20 - 19} - ${
    pageNumber * 20 > props.resultsTotal ? props.resultsTotal : pageNumber * 20
  } of ${props.resultsTotal}`;

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
      <p className={styles.resultsShown} hidden={props.hideText}>
        {currentlyShown}
      </p>
      {props.resultsTotal < 21 ? null : (
        <nav className={styles.navigation} aria-label="Pagination Navigation">
          <button
            className={styles.navBtn}
            onClick={pageDown}
            aria-label={`Goto Page ${pageNumber - 1}`}
            hidden={pageNumber === 1}>
            {"<<"}
          </button>
          <p
            className={styles.currentPage}
            aria-label={`Current Page, Page ${pageNumber}`}>
            {pageNumber}
          </p>
          <button
            className={styles.navBtn}
            onClick={pageUp}
            aria-label={`Goto Page ${pageNumber + 1}`}
            hidden={pageNumber * 20 >= props.resultsTotal}>
            {">>"}
          </button>
        </nav>
      )}
    </div>
  );
}

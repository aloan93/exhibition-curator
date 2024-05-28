import { ReactNode, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./MyExhibition.module.css";
import useExhibition from "../../hooks/useExhibition";
import EntrySelecter from "../MyExhibitionEntry/EntrySelecter";
import PageNav from "../PageNav/PageNav";

export default function MyExhibition(): ReactNode {
  const { exhibition } = useExhibition();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const paginatedExhibition = exhibition.slice(
    Number(page) * 20 - 20,
    Number(page) * 20
  );
  const resultsTotal = exhibition.length;

  useEffect(() => {
    if (exhibition.length !== 0 && exhibition.length < 20 * Number(page) - 19) {
      setSearchParams((prev) => {
        prev.set("page", String(Number(page) - 1));
        return prev;
      });
    }
  }, [exhibition]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Exhibiton</h2>
      {exhibition.length > 0 ? (
        <PageNav
          page={page}
          setSearchParams={setSearchParams}
          resultsTotal={resultsTotal}
          hideText={false}
        />
      ) : null}
      <ul className={styles.listContainer}>
        {paginatedExhibition.map((entry) => {
          return (
            <li key={`${entry.collection} - ${entry.id}`}>
              <EntrySelecter entry={entry} />
            </li>
          );
        })}
      </ul>
      {exhibition.length > 0 ? (
        <PageNav
          page={page}
          setSearchParams={setSearchParams}
          resultsTotal={resultsTotal}
          hideText={true}
        />
      ) : null}
    </div>
  );
}

import { ReactNode, useEffect, useState } from "react";
import styles from "../SavedExhibition/SavedExhibition.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import PageNav from "../PageNav/PageNav";
import EntrySelecter from "../MyCollection/EntrySelecter";

export default function GuestExhibition(): ReactNode {
  const { exhibitionId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [exhibition, setExhibition] = useState<any>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const url = location.href;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [paginatedArtefacts, setPaginatedArtefacts] = useState([]);
  const artefactsTotal = exhibition?.artefacts.length;

  useEffect(() => {
    setIsLoading(true);
    setError("");
    getDoc(doc(db, "Exhibitions", exhibitionId || ""))
      .then((res) => {
        if (!res.exists()) {
          setError("Exhibition not found");
          return null;
        } else {
          return res.data();
        }
      })
      .then((document) => {
        if (document && document.user.id !== currentUser?.uid) {
          setExhibition({ ...document, exhibitionId });
          setPaginatedArtefacts(
            document.artefacts.slice(Number(page) * 20 - 20, Number(page) * 20)
          );
        } else if (document && document.user.id === currentUser.uid) {
          navigate(`/profile/${exhibitionId}`, { replace: true });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong. Please try again later");
        setIsLoading(false);
      });
  }, [searchParams]);

  function handleShare(e: any) {
    e.preventDefault();
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard");
      })
      .catch(() => {
        alert("Failed to copy URL. Please try again later");
      });
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          {error ? (
            <div className={styles.errorContainer}>
              <p className={styles.error}>{error}</p>
            </div>
          ) : (
            <>
              <div className={styles.headerContainer}>
                <div className={styles.titleContainer}>
                  <h2 className={styles.title}>{exhibition.exhibitionName}</h2>

                  <button
                    className={styles.shareBtn}
                    aria-label="Copy share link to exhibition"
                    onClick={handleShare}>
                    Share
                  </button>
                </div>
              </div>

              <PageNav
                page={page}
                setSearchParams={setSearchParams}
                resultsTotal={artefactsTotal}
                hideText={false}
              />

              <ul className={styles.listContainer}>
                {paginatedArtefacts.map(
                  (artefact: { collection: string; id: number }, id: any) => {
                    return (
                      <li key={id}>
                        <EntrySelecter entry={artefact} />
                      </li>
                    );
                  }
                )}
              </ul>

              <PageNav
                page={page}
                setSearchParams={setSearchParams}
                resultsTotal={artefactsTotal}
                hideText={true}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

import { ReactNode, useEffect, useState } from "react";
import styles from "./SavedExhibition.module.css";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import TitleContainer from "./TitleContainer";
import PageNav from "../PageNav/PageNav";
import EntrySelecter from "../MyExhibition/EntrySelecter";
import DeleteExhibition from "./DeleteExhibition";

export default function SavedExhibition(): ReactNode {
  const { exhibitionId } = useParams();
  const { currentUser } = useAuth();
  const [exhibition, setExhibition] = useState<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [initialError, setInitialError] = useState("");
  const [queryError, setQueryError] = useState("");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeletionSuccess, setIsDeletionSuccess] = useState(false);
  const [isRenameLoading, setIsRenameLoading] = useState(false);

  // Pagination variables
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [paginatedArtefacts, setPaginatedArtefacts] = useState([]);
  const artefactsTotal = exhibition?.artefacts.length;

  useEffect(() => {
    !currentUser ? navigate(from, { replace: true }) : null;
  }, [currentUser]);

  useEffect(() => {
    setIsInitialLoading(true);
    setInitialError("");
    setQueryError("");
    getDoc(doc(db, "Exhibitions", exhibitionId || ""))
      .then((res) => {
        if (!res.exists()) {
          setInitialError("Exhibition not found");
          return null;
        } else {
          return res.data();
        }
      })
      .then((document) => {
        if (document && document.user.id !== currentUser?.uid) {
          setInitialError("No permission to view this exhibition");
        } else if (document && document.user.id === currentUser.uid) {
          setExhibition({ ...document, exhibitionId });
          setPaginatedArtefacts(
            document.artefacts.slice(Number(page) * 20 - 20, Number(page) * 20)
          );
        }
        setIsInitialLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setInitialError("Something went wrong. Please try again later");
        setIsInitialLoading(false);
      });
  }, [searchParams]);

  return (
    <div className={styles.container}>
      {isInitialLoading ? (
        <div className={styles.largeLoader}></div>
      ) : (
        <>
          {initialError ? (
            <div className={styles.errorContainer}>
              <p className={styles.error}>{initialError}</p>
            </div>
          ) : (
            <>
              <div className={styles.headerContainer}>
                <TitleContainer
                  exhibition={exhibition}
                  setQueryError={setQueryError}
                  isDeleteLoading={isDeleteLoading}
                  isDeletionSuccess={isDeletionSuccess}
                  isRenameLoading={isRenameLoading}
                  setIsRenameLoading={setIsRenameLoading}
                />
              </div>

              {queryError ? (
                <div className={styles.errorContainer}>
                  <p className={styles.error}>{queryError}</p>
                </div>
              ) : null}

              {isDeletionSuccess ? (
                <div>
                  <p className={styles.prompt}>Successfully Deleted</p>
                </div>
              ) : (
                <>
                  <PageNav
                    page={page}
                    setSearchParams={setSearchParams}
                    resultsTotal={artefactsTotal}
                    hideText={false}
                  />

                  <ul className={styles.listContainer}>
                    {paginatedArtefacts.map(
                      (
                        artefact: { collection: string; id: number },
                        id: any
                      ) => {
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

                  <DeleteExhibition
                    exhibition={exhibition}
                    setQueryError={setQueryError}
                    isRenameLoading={isRenameLoading}
                    isDeleteLoading={isDeleteLoading}
                    setIsDeleteLoading={setIsDeleteLoading}
                    isDeletionSuccess={isDeletionSuccess}
                    setIsDeletionSuccess={setIsDeletionSuccess}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

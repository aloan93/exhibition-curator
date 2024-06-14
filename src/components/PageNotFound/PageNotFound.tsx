import { ReactNode } from "react";
import styles from "./PageNotFound.module.css";
import { useNavigate } from "react-router-dom";

export default function PageNotFound(): ReactNode {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{`Page Does Not Exist`}</h2>
      <button
        className={styles.backBtn}
        aria-label="Back to previous page"
        onClick={() => {
          if (window.history?.length && window.history.length > 1) {
            navigate(-1);
          } else {
            navigate("/", { replace: true });
          }
        }}>
        Back
      </button>
    </div>
  );
}

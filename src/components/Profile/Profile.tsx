import { ReactNode, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import SavedExhibitions from "./SavedExhibitions";

export default function Profile(): ReactNode {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(currentUser);
    !currentUser ? navigate(from, { replace: true }) : null;
  }, [currentUser]);

  function handleLogout(e: any) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    logout().catch((err: any) => {
      setError("Failed to Logout. Please try again later");
      setIsLoading(false);
      console.log(err);
    });
  }

  if (!currentUser) return null;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{currentUser.email}</h2>

      {error ? (
        <div className={styles.errorContainer}>
          <p className={styles.error}>{error}</p>
        </div>
      ) : null}

      <SavedExhibitions uid={currentUser.uid} />

      <button
        className={styles.logoutBtn}
        onClick={handleLogout}
        disabled={isLoading}>
        Logout
      </button>
    </div>
  );
}

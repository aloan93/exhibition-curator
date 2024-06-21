import { ReactNode, useEffect } from "react";
import styles from "./Profile.module.css";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile(): ReactNode {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/signup";

  useEffect(() => {
    !currentUser ? navigate(from, { replace: true }) : null;
  }, [currentUser]);

  function handleLogout(e: any) {
    e.preventDefault();
  }

  if (!currentUser) return null;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{currentUser.email}</h2>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

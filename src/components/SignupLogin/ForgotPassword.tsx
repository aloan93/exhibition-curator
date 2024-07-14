import { ReactNode, useEffect, useState } from "react";
import styles from "./SignupLogin.module.css";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ForgotPassword(): ReactNode {
  const [emailInput, setEmailInput] = useState("");
  const { currentUser, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  const [message, setMessage] = useState("");

  useEffect(() => {
    currentUser ? navigate(from, { replace: true }) : null;
  }, [currentUser]);

  function handleForgotPassword(e: any) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");
    resetPassword(emailInput)
      .then(() => {
        setMessage("Check your email inbox for further instruction");
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to reset password. Please try again later");
        setIsLoading(false);
      });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Password Reset</h2>

      <form className={styles.formContainer} onSubmit={handleForgotPassword}>
        {error ? <p className={styles.error}>{error}</p> : null}

        {message ? <p className={styles.message}>{message}</p> : null}

        <input
          className={styles.formInput}
          type="email"
          placeholder="Email"
          aria-label="Email input"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          required
        />

        <button className={styles.formBtn} disabled={isLoading}>
          Reset Password
        </button>

        <Link className={styles.formLink} to="/login">
          Login
        </Link>
      </form>

      <p className={styles.altLink}>
        Need an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

import { ReactNode, useState, useEffect } from "react";
import styles from "./SignupLogin.module.css";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login(): ReactNode {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { currentUser, login } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  useEffect(() => {
    currentUser ? navigate(from, { replace: true }) : null;
  }, [currentUser]);

  function handleLogin(e: any) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    login(emailInput, passwordInput).catch((err: any) => {
      setIsLoading(false);
      setError("Failed to login. Please try again later");
      console.log(err);
    });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>

      <form className={styles.formContainer} onSubmit={handleLogin}>
        {error ? <p className={styles.error}>{error}</p> : null}

        <input
          className={styles.formInput}
          type="email"
          placeholder="Email"
          aria-label="Email input"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          required
        />

        <input
          className={styles.formInput}
          type="password"
          placeholder="Password"
          aria-label="Password input"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          required
        />

        <button className={styles.formBtn} disabled={isLoading}>
          Login
        </button>
      </form>

      <p className={styles.altLink}>
        Need an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

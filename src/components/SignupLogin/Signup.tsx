import { ReactNode, useEffect, useState } from "react";
import styles from "./SignupLogin.module.css";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export default function Signup(): ReactNode {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [retypedPasswordInput, setRetypedPasswordInput] = useState("");
  const { currentUser, signup } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  useEffect(() => {
    currentUser ? navigate(from, { replace: true }) : null;
  }, [currentUser]);

  function handleSignup(e: any) {
    e.preventDefault();
    if (passwordInput !== retypedPasswordInput) {
      return setError("Passwords do not match");
    } else if (passwordInput.length < 6) {
      return setError("Password must be at least 6 characters long");
    }
    setIsLoading(true);
    setError("");
    signup(emailInput, passwordInput).catch((err: any) => {
      setIsLoading(false);
      setError("Failed to create an account. Please try again later");
      console.log(err);
    });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Signup</h2>

      <form className={styles.formContainer} onSubmit={handleSignup}>
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

        <input
          className={styles.formInput}
          type="password"
          placeholder="Retype Password"
          aria-label="Retype Password input"
          value={retypedPasswordInput}
          onChange={(e) => setRetypedPasswordInput(e.target.value)}
          required
        />

        <button className={styles.formBtn} disabled={isLoading}>
          Signup
        </button>
      </form>
    </div>
  );
}

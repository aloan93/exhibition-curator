import { ReactNode, useState } from "react";
import styles from "./Profile.module.css";
import useAuth from "../../hooks/useAuth";
import { EmailAuthProvider } from "firebase/auth";

export default function DeleteAccount(props: {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode {
  const { currentUser, deleteAccount, reauth } = useAuth();
  const [passwordInput, setPasswordInput] = useState("");
  const [isDeletionRequested, setIsDeletionRequested] = useState(false);
  const [error, setError] = useState("");
  const credential = EmailAuthProvider.credential(
    currentUser.email,
    passwordInput
  );

  function handleDeleteAccount(e: any) {
    e.preventDefault();
    props.setIsLoading(true);
    setError("");
    reauth(currentUser, credential)
      .then(() => {
        return deleteAccount(currentUser);
      })
      .then(() => {
        props.setIsDeleted(true);
        props.setIsLoading(false);
      })
      .catch((err: any) => {
        if (err.code === "auth/invalid-credential")
          setError("Incorrect Password");
        else setError("Failed to delete account. Please try again later");
        setPasswordInput("");
        setIsDeletionRequested(false);
        props.setIsLoading(false);
        console.log(err.code);
      });
  }

  return (
    <>
      {error ? (
        <div className={styles.errorContainer}>
          <p className={styles.error}>{error}</p>
        </div>
      ) : null}

      {isDeletionRequested ? (
        <form className={styles.formContainer} onSubmit={handleDeleteAccount}>
          <h3 className={styles.formTitle}>Delete Account</h3>

          <p className={styles.formPrompt}>Confirm password to proceed</p>

          <input
            className={styles.formInput}
            type="password"
            placeholder="Password"
            aria-label="Password Input"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />

          <button
            className={styles.formSubmitBtn}
            type="submit"
            disabled={props.isLoading}>
            Submit
          </button>

          <button
            className={styles.formCancelBtn}
            type="reset"
            onClick={() => {
              setPasswordInput("");
              setIsDeletionRequested(false);
            }}
            disabled={props.isLoading}>
            Cancel
          </button>
        </form>
      ) : (
        <button
          className={styles.deleteBtn}
          onClick={() => setIsDeletionRequested(true)}
          disabled={props.isLoading}>
          Delete Account
        </button>
      )}
    </>
  );
}

import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthCredential,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

const authContextDefault = {
  currentUser: null as any,
  // @ts-ignore
  signup: (_email: string, _password: string) => any,
  // @ts-ignore
  login: (_email: string, _password: string) => any,
  // @ts-ignore
  logout: () => any,
  // @ts-ignore
  resetPassword: (_email: string) => any,
  // @ts-ignore
  deleteAccount: (_user: any) => any,
  // @ts-ignore
  reauth: (_user: any, _credential: EmailAuthCredential) => any,
};

const AuthContext = createContext(authContextDefault);

function AuthProvider(props: { children: any }) {
  const [currentUser, setCurrentUser] = useState(
    authContextDefault.currentUser
  );
  const [isLoading, setIsLoading] = useState(true);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function deleteAccount(user: any) {
    return deleteUser(user);
  }

  function reauth(user: any, credential: EmailAuthCredential) {
    return reauthenticateWithCredential(user, credential);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        deleteAccount,
        reauth,
      }}>
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

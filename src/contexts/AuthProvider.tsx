import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const authContextDefault = {
  currentUser: null as any,
  // @ts-ignore
  signup: (_email: string, _password: string) => any,
  // @ts-ignore
  login: (_email: string, _password: string) => any,
  // @ts-ignore
  logout: () => any,
};

const AuthContext = createContext(authContextDefault);

function AuthProvider(props: { children: any }) {
  const [currentUser, setCurrentUser] = useState(
    authContextDefault.currentUser
  );
  const [isLoading, setIsLoading] = useState(true);

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

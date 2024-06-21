import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const authContextDefault = {
  currentUser: null as any,
  // @ts-ignore
  signup: (_email: string, _password: string) => any,
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signup }}>
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

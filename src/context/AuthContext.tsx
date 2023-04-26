import { createContext, useEffect, useState, ReactNode } from "react";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }

      return () => {
        unsubscribe();
      };
    });
  }, []);

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user) {
          const { displayName, photoURL, uid } = result.user;

          if (!displayName || !photoURL) {
            throw new Error("Missing information from Google Account");
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

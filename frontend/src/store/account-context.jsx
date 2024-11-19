import { createContext, useLayoutEffect, useState } from "react";

export const AccountContext = createContext({
  isLogged: false,
  setIsLogged: () => {},
});

export default function AccountProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useLayoutEffect(() => {
    const loggedIn = localStorage.getItem("is_logged_in") === "true";
    const isAdmin = localStorage.getItem("is_admin") === "true";

    if (loggedIn) {
      setIsLogged(true);
    }

    if (isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  useLayoutEffect(() => {
    if (isLogged) {
      localStorage.setItem("is_logged_in", true);
    } else {
      localStorage.removeItem("is_logged_in");
    }
  }, [isLogged]);

  useLayoutEffect(() => {
    if (isAdmin) {
      localStorage.setItem("is_admin", true);
    } else {
      localStorage.removeItem("is_admin");
    }
  }, [isLogged]);

  return (
    <AccountContext.Provider
      value={{ isLogged, setIsLogged, isAdmin, setIsAdmin }}
    >
      {children}
    </AccountContext.Provider>
  );
}

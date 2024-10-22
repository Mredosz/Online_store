import { createContext, useLayoutEffect, useState } from "react";

export const AccountContext = createContext({
  isLogged: false,
  setIsLogged: () => {},
});

export default function AccountProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  useLayoutEffect(() => {
    const loggedIn = localStorage.getItem("is_logged_in") === "true";
    if (loggedIn) {
      setIsLogged(true);
    }
  }, []);

  useLayoutEffect(() => {
    if (isLogged) {
      localStorage.setItem("is_logged_in", true);
    } else {
      localStorage.removeItem("is_logged_in");
    }
  }, [isLogged]);

  return (
    <AccountContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AccountContext.Provider>
  );
}

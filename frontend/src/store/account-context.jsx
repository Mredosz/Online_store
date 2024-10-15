import { createContext, useState } from "react";

export const AccountContext = createContext({
  isLogged: false,
  setIsLogged: () => {},
});

export default function AccountProvider({ children }) {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("is_logged_in"),
  );

  return (
    <AccountContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AccountContext.Provider>
  );
}

import { createContext, useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const authContext = createContext();
export function AuthenticationContextProvider({ children }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("tkn") != null) {
      setToken(localStorage.getItem("tkn")); 
    }
  }, []);
  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}

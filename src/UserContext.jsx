//for showing the username if logged in

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  //for preventing username to disappear when refreshing.
  const FetchUser = async () => {
    try {
      const response = await axios.get("/profile");
      setUser(response.data);
      setReady(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    FetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

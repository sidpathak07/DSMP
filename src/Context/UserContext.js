import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    uid: "",
    admin: false,
  });

  const [collections, setCollections] = useState([]);
  const [profile, setProfile] = useState({});
  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        collections,
        setCollections,
        profile,
        setProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

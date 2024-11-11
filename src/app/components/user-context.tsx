// UserContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface UserContextType {
  signedIn: boolean;
  toggleSignIn: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component to wrap around your app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState(false);

  const toggleSignIn = () => {
    setSignedIn((prev) => !prev);
  };

  return (
    <UserContext.Provider value={{ signedIn, toggleSignIn }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

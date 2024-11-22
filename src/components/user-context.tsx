"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the user object
interface User {
  name: string;
  email: string;
  username?: string;
  createdAt: string;
}

// Define the shape of the context
interface UserContextType {
  user: User | null; // Null if no user is signed in
  signedIn: boolean;
  toggleSignIn: (userData?: User) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component to wrap around your app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Consolidated toggleSignIn function
  const toggleSignIn = (userData?: User) => {
    if (signedIn) {
      // Sign out if currently signed in
      setUser(null);
      setSignedIn(false);
    } else if (userData) {
      // Sign in if not signed in and userData is provided
      setUser(userData);
      setSignedIn(true);
    }
  };

  return (
    <UserContext.Provider value={{ user, signedIn, toggleSignIn }}>
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

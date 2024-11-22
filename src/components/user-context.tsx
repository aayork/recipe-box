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
  signIn: (userData: User) => void; // Function to sign in the user
  signOut: () => void; // Function to sign out the user
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component to wrap around your app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Function to sign in the user
  const signIn = (userData: User) => {
    setUser(userData);
    setSignedIn(true);
  };

  // Function to sign out the user
  const signOut = () => {
    setUser(null);
    setSignedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, signedIn, signIn, signOut }}>
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

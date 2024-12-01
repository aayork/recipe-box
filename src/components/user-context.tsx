"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the user object
interface User {
  _id: string;
  name: string;
  email: string;
  username?: string;
  createdAt: string;
  favorites: string[];
}

// Define the shape of the context
interface UserContextType {
  user: User | null; // Null if no user is signed in
  signedIn: boolean;
  toggleSignIn: (userData?: User) => void;
  updateUser: (updates: Partial<User>, favoriteUpdate?: { recipeId: string; add: boolean }) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component to wrap around your app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Load user state from localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedSignedIn = localStorage.getItem("signedIn");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedSignedIn) setSignedIn(JSON.parse(savedSignedIn));
  }, []);

  // Update localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("signedIn", JSON.stringify(signedIn));
  }, [user, signedIn]);

  // Consolidated toggleSignIn function
  const toggleSignIn = (userData?: User) => {
    if (signedIn) {
      // Sign out if currently signed in
      setUser(null);
      setSignedIn(false);
      localStorage.removeItem("user");
      localStorage.removeItem("signedIn");
    } else if (userData) {
      // Sign in if not signed in and userData is provided
      setUser({
        _id: userData._id,
        name: userData.name || "User", // Default to "User" if name is not provided
        email: userData.email || "",
        username: userData.username || "User", // Default to "User" if username is not provided
        createdAt: userData.createdAt || new Date().toISOString(), // Provide a default date
        favorites: userData.favorites || [],
      });
      setSignedIn(true);
    }
  };

  // Unified updateUser function
  const updateUser = (
    updates: Partial<User>,
    favoriteUpdate?: { recipeId: string; add: boolean }
  ) => {
    if (user) {
      let updatedFavorites = user.favorites;

      if (favoriteUpdate) {
        updatedFavorites = favoriteUpdate.add
          ? [...user.favorites, favoriteUpdate.recipeId]
          : user.favorites.filter((favId) => favId !== favoriteUpdate.recipeId);
      }

      const updatedUser = {
        ...user,
        ...updates,
        favorites: updatedFavorites,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ user, signedIn, toggleSignIn, updateUser }}>
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


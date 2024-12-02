"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  username?: string;
  createdAt: string;
  favorites: string[];
}

interface UserContextType {
  user: User | null; // Null if no user is signed in
  signedIn: boolean;
  toggleSignIn: (userData?: User) => void;
  updateUser: (
    updates: Partial<User>,
    favoriteUpdate?: { recipeId: string; add: boolean },
  ) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedSignedIn = localStorage.getItem("signedIn");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedSignedIn) setSignedIn(JSON.parse(savedSignedIn));
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("signedIn", JSON.stringify(signedIn));
  }, [user, signedIn]);

  const toggleSignIn = (userData?: User) => {
    if (signedIn) {
      setUser(null);
      setSignedIn(false);
      localStorage.removeItem("user");
      localStorage.removeItem("signedIn");
    } else if (userData) {
      setUser({
        _id: userData._id,
        name: userData.name || "User",
        email: userData.email || "",
        username: userData.username || "User",
        createdAt: userData.createdAt || new Date().toISOString(),
        favorites: userData.favorites || [],
      });
      setSignedIn(true);
    }
  };

  const updateUser = (
    updates: Partial<User>,
    favoriteUpdate?: { recipeId: string; add: boolean },
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

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

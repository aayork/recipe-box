"use client";

import { useState } from "react";
import { useUser } from "./user-context";
import { useRouter } from "next/navigation";
import AuthToggle from "./auth-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

interface HeaderProps {
  onSearchAction: (query: string) => void;
}

export function Header({ onSearchAction }: HeaderProps) {
  const { user, signedIn, toggleSignIn } = useUser();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignOut = () => {
    toggleSignIn();
    router.push("/");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchAction(query);
  };

  return (
    <>
      <div className="flex items-center justify-between p-1 w-full">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="font-bold text-2xl">
            {signedIn
              ? `Welcome to Recipe Box, ${user?.username || "User"}!`
              : "Welcome to Recipe Box!"}
          </h1>
        </div>
        <div className="flex items-center">
          <Input
            className="w-56 ml-2"
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            onClick={signedIn ? handleSignOut : () => setShowAuthModal(true)}
            className="ml-2 bg-blue-500 text-white hover:bg-blue-600 border border-input"
          >
            {signedIn ? "Sign Out" : "Sign In"}
          </Button>
        </div>
      </div>
      {showAuthModal && (
        <AuthToggle closeModal={() => setShowAuthModal(false)} />
      )}
    </>
  );
}
function onSearchAction(value: string) {
  throw new Error("Function not implemented.");
}

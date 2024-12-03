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
    onSearch(query);
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
            className="ml-2 bg-[hsl(45,80%,90%)] text-[hsl(260,50%,40%)] border border-[hsl(45,80%,90%)]"
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            onClick={signedIn ? handleSignOut : () => setShowAuthModal(true)}
            className="ml-2 bg-[hsl(45,80%,90%)] text-[hsl(260,50%,40%)] hover:bg-[hsl(260,60%,80%)]"
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
function onSearch(value: string) {
  throw new Error("Function not implemented.");
}

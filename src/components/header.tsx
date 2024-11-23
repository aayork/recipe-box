"use client"

import { useState } from "react";
import { useUser } from "./user-context";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import AuthToggle from "./auth-toggle";
import { Input } from "@/components/ui/input";


export function Header() {
  const { user, signedIn, toggleSignIn } = useUser();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = () => {
    toggleSignIn(); // Reset user context
    router.push("/"); // Redirect to home route
  };

  return (
    <>
    <div className="flex items-center justify-between p-1 w-full">
      <h1 className="font-bold text-2xl text-center flex-grow">
        {signedIn
          ? `Welcome to Recipe Box, ${user?.username || "User"}!`
          : "Welcome to Recipe Box!"}
      </h1>


      <div className="flex items-center">
        <ModeToggle />
        <Input className="w-56 ml-2" type="search" placeholder="Search" />
          <button
            onClick={
              signedIn ? handleSignOut : () => setShowAuthModal(true)
            }
            className="ml-2 px-4 py-[6px] rounded-md bg-blue-500 text-white hover:bg-blue-600 border border-input"
          >
            {signedIn ? "Sign Out" : "Sign In"}
          </button>
        </div>
      </div>
      {showAuthModal && <AuthToggle closeModal={() => setShowAuthModal(false)} />}
    </>
  );
}
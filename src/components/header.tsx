"use client";

import { Input } from "@/components/ui/input";
import { useUser } from "./user-context";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  const { signedIn, toggleSignIn } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    toggleSignIn();
    router.push("/"); // Redirect to home route on logout
  };

  return (
    <div className="flex items-center justify-between p-1 w-full">
      {/* Dynamic and Centered Title */}
      <h1 className="font-bold text-2xl text-center flex-grow">
        {signedIn ? "Welcome Back to Recipe Box!" : "Welcome to Recipe Box!"}
      </h1>
      {/* Right-Aligned Controls */}
      <div className="flex items-center">
        <ModeToggle />
        <Input className="w-56 ml-4" type="search" placeholder="Search" />
        <button
          onClick={signedIn ? handleSignOut : toggleSignIn}
          className="ml-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 border border-input"
        >
          {signedIn ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </div>
  );
  
}

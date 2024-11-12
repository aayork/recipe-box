// Header.tsx
"use client";

import { Input } from "@/components/ui/input";
import { useUser } from "./user-context";
import { useRouter } from "next/navigation";

export function Header() {
  const { signedIn, toggleSignIn } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    toggleSignIn();
    router.push("/"); // Redirect to home route on logout
  };

  return (
    <div className="flex items-center justify-between p-1 w-full">
      <h1 className="font-bold text-2xl">Welcome to Recipe Box!</h1>
      <div className="flex items-center ml-auto">
        <Input className="w-56" type="search" placeholder="Search" />
        <button
          onClick={signedIn ? handleSignOut : toggleSignIn}
          className="ml-2 px-3 py-[6px] rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          {signedIn ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </div>
  );
}

// Header.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useUser } from "./user-context"; // Import the context

export function Header() {
  const { signedIn, toggleSignIn } = useUser(); // Access signedIn and toggleSignIn

  return (
    <div className="flex items-center justify-between p-1 w-full">
      <h1 className="font-bold text-2xl">Welcome to Recipe Box!</h1>
      <div className="flex items-center ml-auto">
        <Input className="w-56" type="search" placeholder="Search" />
        {signedIn ? (
          <Avatar className="w-8 h-8 ml-1">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AY</AvatarFallback>
          </Avatar>
        ) : (
          <button
            onClick={toggleSignIn}
            className="ml-2 px-3 py-[6px] rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

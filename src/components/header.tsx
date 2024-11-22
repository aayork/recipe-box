"use client";

import { Input } from "@/components/ui/input";
import { useUser } from "./user-context";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  const { signedIn, toggleSignIn } = useUser();
  const router = useRouter();

  const handleSignIn = () => {
    // Example user data for sign-in
    const mockUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: new Date().toISOString(),
    };
    toggleSignIn(mockUser); // Sign in with mock user data
  };

  const handleSignOut = () => {
    toggleSignIn(); // Sign out
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
        <Input className="w-56 ml-2" type="search" placeholder="Search" />
        <button
          onClick={signedIn ? handleSignOut : handleSignIn} // Use specific handlers
          className="ml-2 px-4 py-[6px] rounded-md bg-blue-500 text-white hover:bg-blue-600 border border-input"
        >
          {signedIn ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useUser } from "./user-context";
import { useRouter } from "next/navigation";
import AuthToggle from "./auth-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const { user, signedIn, toggleSignIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = () => {
    toggleSignIn(); // Reset user context
    router.push("/"); // Redirect to home route
  };

  return (
    <>
      <div className="flex items-center justify-between p-1 w-full">
        <div className="flex items-center gap-4">
          {pathname === "/" ? (
            <img
              src="/favicon.ico"
              alt="Recipe Box Icon"
              width={50}
              height={50}
              className="w-12 h-12"
            />
          ) : (
            <Link href="/" passHref>
              <img
                src="/logo.png"
                alt="Recipe Box Icon"
                width={50}
                height={50}
                className="cursor-pointer w-12 h-12"
              />
            </Link>
          )}
          <h1 className="font-bold text-2xl">
            {signedIn
              ? `Welcome to Recipe Box, ${user?.username || "User"}!`
              : "Welcome to Recipe Box!"}
          </h1>
        </div>
        <div className="flex items-center">
          <Input className="w-56 ml-2" type="search" placeholder="Search" />
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

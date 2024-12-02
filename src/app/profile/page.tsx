"use client";

import { useState } from "react";
import { useUser } from "@/components/user-context";
import { useRouter } from "next/navigation";
import AuthToggle from "@/components/auth-toggle";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function ProfilePage() {
  const { user, signedIn, toggleSignIn } = useUser();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = () => {
    toggleSignIn();
    router.push("/");
  };

  if (!signedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
        <div className="bg-white text-gray-900 p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-6">You are not signed in</h1>
          <Button
            onClick={() => setShowAuthModal(true)}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign In
          </Button>
          {showAuthModal && (
            <AuthToggle closeModal={() => setShowAuthModal(false)} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <SidebarTrigger className="m-2" />
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 p-6">
        <div className="bg-white text-gray-900 p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-6">
            {user?.username}'s Profile
          </h1>
          <p className="text-lg mb-2">
            <strong>Email:</strong> {user?.email}
          </p>
          <p className="text-lg mb-2">
            <strong>Username:</strong> {user?.username}
          </p>
          <Button
            onClick={handleSignOut}
            className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

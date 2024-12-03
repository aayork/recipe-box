"use client";

import { useState } from "react";
import { useUser } from "@/components/user-context";
import { useRouter } from "next/navigation";
import AuthToggle from "@/components/auth-toggle";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, signedIn, toggleSignIn, updateUser } = useUser();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    email: user?.email || "",
    username: user?.username || "",
    password: "",
  });

  const handleSignOut = () => {
    toggleSignIn();
    router.push("/");
  };

  const handleSaveChanges = () => {
    updateUser({
      email: editedUser.email,
      username: editedUser.username,
      ...(editedUser.password && { password: editedUser.password }, {}),
    });
    setEditMode(false);
  };

  if (!signedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(45,80%,85%)] text-[hsl(260,50%,40%)] p-6">
        <div className="bg-[hsl(45,80%,90%)] text-[hsl(260,50%,40%)] p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-6">You are not signed in</h1>
          <Button
            onClick={() => setShowAuthModal(true)}
            className="w-full p-2 bg-[hsl(260,60%,80%)] text-[hsl(260,50%,40%)] rounded hover:bg-[hsl(260,60%,75%)]"
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(45,80%,85%)] text-[hsl(260,50%,40%)] p-6">
      <div className="bg-[hsl(45,80%,90%)] text-[hsl(260,50%,40%)] p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-6">
          {editMode ? "Edit Profile" : `${user?.username}'s Profile`}
        </h1>
        {editMode ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveChanges();
            }}
          >
            <input
              type="email"
              className="text-input mb-4 p-2 w-full border-[hsl(45,80%,90%)] rounded text-[hsl(260,50%,40%)] text:bg-[hsl(45,80%,90%)]"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
              placeholder="Email"
            />
            <input
              type="text"
              className="text-input mb-4 p-2 w-full border-[hsl(45,80%,90%)] rounded text-[hsl(260,50%,40%)] text:bg-[hsl(45,80%,90%)]"
              value={editedUser.username}
              onChange={(e) =>
                setEditedUser({ ...editedUser, username: e.target.value })
              }
              placeholder="Username"
            />
            <input
              type="password"
              className="text-input mb-4 p-2 w-full border-[hsl(45,80%,90%)] rounded text-[hsl(260,50%,40%)] text:bg-[hsl(45,80%,90%)]"
              value={editedUser.password}
              onChange={(e) =>
                setEditedUser({ ...editedUser, password: e.target.value })
              }
              placeholder="New Password"
            />
            <Button
              type="submit"
              className="w-full p-2 bg-[hsl(260,60%,80%)] text-[hsl(260,50%,40%)] rounded hover:bg-[hsl(260,60%,75%)]"
            >
              Save Changes
            </Button>
            <Button
              onClick={() => setEditMode(false)}
              className="w-full p-2 bg-[hsl(260,50%,30%)] text-[hsl(45,80%,85%)] rounded hover:bg-[hsl(260,50%,25%)] mt-2"
            >
              Cancel
            </Button>
          </form>
        ) : (
          <>
            <p className="text-lg mb-2">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-lg mb-2">
              <strong>Username:</strong> {user?.username}
            </p>
            <Button
              onClick={handleSignOut}
              className="w-full p-2 bg-[hsl(330,80%,70%)] text-[hsl(260,50%,40%)] rounded hover:bg-[hsl(330,80%,65%)] mt-2"
            >
              Sign Out
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useUser } from "@/components/user-context"; // Adjust the path as needed
import { useRouter } from "next/navigation";
import AuthToggle from "@/components/auth-toggle"; // Adjust the path as needed
import { Button } from "@/components/ui/button"; // Adjust the path as needed

export default function ProfilePage() {
  const { user, signedIn, toggleSignIn, updateUserDetails } = useUser();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    email: user?.email || '',
    username: user?.username || '',
    password: '' // Added for changing password
  });

  const handleSignOut = () => {
    toggleSignIn(); // Reset user context to null
    router.push("/"); // Redirect to home route
  };

  const handleSaveChanges = () => {
    updateUserDetails({
      email: editedUser.email,
      username: editedUser.username,
      // Include password only if it's been set
      ...(editedUser.password && { password: editedUser.password })
    });
    setEditMode(false); // Exit edit mode
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-6">{editMode ? "Edit Profile" : `${user?.username}'s Profile`}</h1>
        {editMode ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
            <input
              type="email"
              className="text-input mb-4 p-2 w-full border rounded text-black"
              value={editedUser.email}
              onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
              placeholder="Email"
            />
            <input
              type="text"
              className="text-input mb-4 p-2 w-full border rounded text-black"
              value={editedUser.username}
              onChange={(e) => setEditedUser({...editedUser, username: e.target.value})}
              placeholder="Username"
            />
            <input
              type="password"
              className="text-input mb-4 p-2 w-full border rounded text-black"
              value={editedUser.password}
              onChange={(e) => setEditedUser({...editedUser, password: e.target.value})}
              placeholder="New Password"
            />
            <Button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save Changes</Button>
            <Button onClick={() => setEditMode(false)} className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-2">Cancel</Button>
          </form>
        ) : (
          <>
            <p className="text-lg mb-2"><strong>Email:</strong> {user?.email}</p>
            <p className="text-lg mb-2"><strong>Username:</strong> {user?.username}</p>
            <Button onClick={() => setEditMode(true)} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit Profile</Button>
            <Button onClick={handleSignOut} className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2">Sign Out</Button>
          </>
        )}
      </div>
    </div>
  );
}

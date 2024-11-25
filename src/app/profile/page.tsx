"use client";

import { useState } from "react";
import { useUser } from "@/components/user-context";

export default function ProfilePage() {
  const { user, signedIn, signIn, signOut } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.username &&
      formData.password
    ) {
      signIn({
        ...formData,
        createdAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6">
      <div className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6">Profile</h1>
        {signedIn && user ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Welcome, {user?.username}!
            </h2>
            <p className="text-lg mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg mb-2">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="text-lg mb-4">
              <strong>Member Since:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <button
              onClick={signOut}
              className="w-full p-2 bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] rounded-lg hover:bg-[hsl(var(--destructive-foreground))] hover:text-[hsl(var(--destructive))]"
            >
              Sign Out
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-left font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))] focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--ring))]"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-left font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))] focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--ring))]"
                required
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-left font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))] focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--ring))]"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-left font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))] focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--ring))]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]"
            >
              Save Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useUser } from "@/components/user-context";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function LoginForm({ closeModal }: { closeModal: () => void }) {
  const { toggleSignIn } = useUser();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Email and password are required.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toggleSignIn({
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        username: data.user.username,
        createdAt: data.user.createdAt,
        favorites: data.user.favorites,
      });

      setMessage("");
      setFormData({ email: "", password: "" });
      closeModal();
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-1">
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <Button type="submit" className="w-full">
        Log In
      </Button>
      {message && (
        <p className="text-center text-sm text-red-500 mt-2">{message}</p>
      )}
    </form>
  );
}

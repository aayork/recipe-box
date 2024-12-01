"use client";

import { useState } from "react";
import { useUser } from "@/components/user-context";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function SignupForm({ closeModal }: { closeModal: () => void }) {
  const { toggleSignIn } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setMessage("Username, email, and password are required.");
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      });

      setMessage("");
      setFormData({ username: "", email: "", password: "" });
      closeModal(); // Close modal after successful login
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-1">
      <Input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        required
      />
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
      <Button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign Up
      </Button>
      {message && <p className="w-full">{message}</p>}
    </form>
  );
}

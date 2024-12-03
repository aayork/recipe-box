"use client";

import { useState } from "react";
import { useUser } from "@/components/user-context";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function SignupForm({
  closeModalAction,
}: {
  closeModalAction: () => void;
}) {
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toggleSignIn(data.user);

      setMessage("");
      setFormData({ username: "", email: "", password: "" });
      closeModalAction(); // Close modal after successful login
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
        className="bg-[hsl(45,80%,90%)] text-[hsl(260,50%,40%)]"
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="bg-[hsl(45,80%,90%)] text-[hsl(260,50%,40%)]"
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="bg-[hsl(45,80%,90%)] text-[hsl(260,50%,40%)]"
        required
      />
      <Button
        type="submit"
        className="w-full hover:bg-[hsl(330,80%,80%)] bg-[hsl(330,80%,85%)]"
      >
        Sign Up
      </Button>
      {message && <p className="ml-2 bg-[hsl(45,80%,90%)] text-[hsl(260,50%,40%)] hover:bg-[hsl(260,60%,80%)]">{message}</p>}
    </form>
  );
}

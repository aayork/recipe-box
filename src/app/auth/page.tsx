'use client';

import { useRouter } from "next/navigation";
import AuthToggle from "@/components/auth-toggle";

export default function AuthPage() {
  const router = useRouter();

  // Function to redirect back to the home page (or close the modal)
  const closeModal = () => {
    router.push("/"); // Navigate to the home page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Authentication</h1>
        {/* Pass closeModal to AuthToggle */}
        <AuthToggle closeModal={closeModal} />
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import SignupForm from '@/components/signup-form';
import LoginForm from '@/components/login-form';
import { useRouter } from 'next/navigation';

export default function AuthToggle({ closeModal }: { closeModal: () => void }) {
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };

  const handleClose = () => {
    closeModal();
    router.push("/"); // Redirect to the home page after closing the modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? 'Sign Up' : 'Log In'}
        </h1>
        {isSignup ? <SignupForm closeModal={handleClose} /> : <LoginForm closeModal={handleClose} />}
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleForm}
            className="text-blue-500 underline hover:text-blue-700"
          >
            {isSignup
              ? 'Already have an account? Log In'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import SignupForm from '@/components/signup-form';
import LoginForm from '@/components/login-form';

export default function AuthToggle() {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Log In'}</h1>
      {isSignup ? <SignupForm /> : <LoginForm />}
      <button
        onClick={toggleForm}
        className="mt-4 text-blue-500 underline hover:text-blue-700"
      >
        {isSignup
          ? 'Already have an account? Log In'
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}

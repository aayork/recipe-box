"use client";

import { useRouter } from "next/navigation";
import AddRecipe from "@/components/add-recipe";

export default function AddRecipePage() {
  const router = useRouter();

  const handleSave = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen p-4">
      <AddRecipe
        onSave={handleSave}
        onClose={() => router.push("/")}
        isPage={true}
      />
    </div>
  );
}

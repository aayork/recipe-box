// add-recipe/page.tsx
"use client";

import { useRouter } from "next/navigation";
import AddRecipe from "../components/add-recipe";

export default function AddRecipePage() {
  const router = useRouter();

  const handleSave = (newRecipe: any) => {
    setRecipeList([...recipeList, newRecipe]);
    setShowModal(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Add a New Recipe</h2>
      <AddRecipe
        onSave={handleSave}
        onClose={() => router.push("/")}
        isPage={true}
      />
    </div>
  );
}

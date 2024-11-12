// add-recipe/page.tsx
"use client";

import { useRouter } from "next/navigation";
import AddRecipe from "../components/add-recipe";
import { useRecipeContext } from "../components/recipe-context";

export default function AddRecipePage() {
  const router = useRouter();
  const { addRecipe } = useRecipeContext();

  const handleSave = (newRecipe: any) => {
    addRecipe(newRecipe);
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

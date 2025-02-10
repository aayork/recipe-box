"use client";

import { useParams, useRouter } from "next/navigation";
import EditRecipe from "@/components/edit-recpie";

export default function EditRecipePage() {
  const router = useRouter();
  const { recipe } = useParams(); // Access the dynamic route parameter

  // Ensure recipe is a string
  const recipeId = Array.isArray(recipe) ? recipe[0] : recipe; // Use the first item if it's an array

  if (!recipeId) {
    // Handle the case where recipeId is undefined
    return (
      <div className="min-h-screen p-4">
        <p>Error: Recipe not found.</p>
      </div>
    );
  }

  const handleSave = (updatedRecipe: any) => {
    console.log("Recipe updated:", updatedRecipe);
    router.push("/");
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen p-4">
      <EditRecipe
        recipeId={recipeId}
        onSave={handleSave}
        onClose={handleClose}
        isPage={true}
      />
    </div>
  );
}

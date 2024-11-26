"use client";

import { useParams, useRouter } from "next/navigation";
import EditRecipe from "@/components/edit-recpie";

export default function EditRecipePage() {
  const router = useRouter();
  const { recipe } = useParams(); // Access the dynamic route parameter

  const handleSave = (updatedRecipe: any) => {
    // Handle save logic, e.g., making an API call to update the recipe
    console.log("Recipe updated:", updatedRecipe);
    router.push("/");
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen p-4">
      <EditRecipe
        recipeId={recipe}
        onSave={handleSave}
        onClose={handleClose}
        isPage={true}
      />
    </div>
  );
}

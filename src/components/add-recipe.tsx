import React, { useState } from "react";

interface AddRecipeProps {
  onSave: (newRecipe: any) => void;
  onClose: () => void;
  userId: string; // Pass the logged-in user's ID
  isPage?: boolean; // Distinguish between modal and page usage
}

const AddRecipe: React.FC<AddRecipeProps> = ({
  onSave,
  onClose,
  userId,
  isPage = false,
}) => {
  const [name, setName] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isFormTouched, setIsFormTouched] = useState(false);

  const clearForm = () => {
    setName("");
    setCookTime("");
    setIngredients("");
    setInstructions("");
    setType("");
    setImageUrl("");
    setIsFormTouched(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !cookTime || !ingredients || !instructions || !type) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: name,
          cookTime,
          ingredients: ingredients.split("\n"), // Convert to array
          instructions,
          type,
          image: imageUrl,
          user: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save the recipe.");
      }

      const newRecipe = await response.json();
      onSave(newRecipe);
      clearForm();
      onClose();
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the recipe.");
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
      setIsFormTouched(true);
    };

  return (
    <div
      className={
        isPage
          ? "min-h-screen p-8"
          : "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      }
    >
      <div
        className={
          isPage
            ? "bg-white p-8 rounded-lg max-w-lg mx-auto"
            : "bg-white p-8 rounded-lg relative max-w-lg w-full"
        }
      >
        {!isPage && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
            onClick={onClose}
          >
            X
          </button>
        )}
        <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Recipe Name</label>
            <input
              placeholder="Recipe Name"
              value={name}
              onChange={handleChange(setName)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Cook Time</label>
            <input
              placeholder="Cook Time"
              value={cookTime}
              onChange={handleChange(setCookTime)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">
              Ingredients (one per line)
            </label>
            <textarea
              placeholder="List ingredients"
              value={ingredients}
              onChange={handleChange(setIngredients)}
              className="border border-gray-300 p-2 rounded w-full h-24"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Instructions</label>
            <textarea
              placeholder="Enter cooking instructions"
              value={instructions}
              onChange={handleChange(setInstructions)}
              className="border border-gray-300 p-2 rounded w-full h-32"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Cuisine Type</label>
            <input
              placeholder="e.g., Italian, Greek"
              value={type}
              onChange={handleChange(setType)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Image URL</label>
            <input
              placeholder="Image URL"
              value={imageUrl}
              onChange={handleChange(setImageUrl)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <button
            type="submit"
            className="mt-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;

import React, { useState } from "react";
import { useUser } from "./user-context";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface AddRecipeProps {
  onSave: (newRecipe: any) => void;
  onClose: () => void;
  isPage?: boolean; // Distinguish between modal and page usage
}

const AddRecipe: React.FC<AddRecipeProps> = ({
  onSave,
  onClose,
  isPage = false,
}) => {
  const [name, setName] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]); // Store ingredients as an array
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isFormTouched, setIsFormTouched] = useState(false);
  const { user, signedIn } = useUser(); // Access signedIn status

  const clearForm = () => {
    setName("");
    setCookTime("");
    setIngredients([""]); // Reset ingredients to an array with one empty string
    setInstructions("");
    setType("");
    setImageUrl("");
    setDescription("");
    setIsFormTouched(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signedIn) {
      alert("You must be signed in to add a recipe.");
      return;
    }

    if (!name || !cookTime || !ingredients.length || !instructions || !type) {
      alert("Please fill in all required fields.");
      return;
    }

    const requestBody = {
      title: name,
      description,
      image: imageUrl,
      cookTime,
      ingredients,
      instructions,
      type,
      user: user?._id,
    };

    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
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
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newIngredients = [...ingredients];
      newIngredients[index] = e.target.value;
      setIngredients(newIngredients);
      setIsFormTouched(true);
    };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]); // Add a new empty ingredient field
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients); // Remove ingredient at index
  };

  return (
    <div
      className={
        isPage
          ? "min-h-screen p-8 bg-[hsl(45,80%,85%)] text-[hsl(260,50%,40%)]"
          : "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      }
    >
      <div
        className={
          isPage
            ? "bg-[hsl(45,80%,90%)] text-[hsl(260,50%,40%)] p-8 rounded-lg max-w-lg mx-auto"
            : "bg-[hsl(45,80%,90%)] text-[hsl(260,50%,40%)] p-8 rounded-lg relative max-w-lg w-full"
        }
      >
        {!isPage && (
          <button
            className="absolute top-4 right-4 text-[hsl(260,50%,40%)] hover:text-black text-lg"
            onClick={onClose}
          >
            X
          </button>
        )}
        <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Recipe Name</label>
            <Input
              placeholder="Recipe Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsFormTouched(true);
              }}
              className="border-[hsl(45,80%,85%)] text-[hsl(260,50%,40%)] bg-[hsl(45,80%,85%)]"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Cook Time</label>
            <Input
              placeholder="Cook Time"
              value={cookTime}
              onChange={(e) => {
                setCookTime(e.target.value);
                setIsFormTouched(true);
              }}
              className="border-[hsl(45,80%,85%)] text-[hsl(260,50%,40%)] bg-[hsl(45,80%,85%)]"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  type="text"
                  value={ingredient}
                  onChange={handleChange(index)}
                  placeholder="Ingredient"
                  className="border-[hsl(45,80%,85%)] text-[hsl(260,50%,40%)] bg-[hsl(45,80%,85%)]"
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="ml-2 bg-[hsl(330,80%,85%)] hover:bg-[hsl(330,80%,75%)]"
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddIngredient}
              className="mt-2 bg-[hsl(260,60%,80%)] hover:bg-[hsl(260,60%,75%)]"
            >
              <Plus /> Add Ingredient
            </Button>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Instructions</label>
            <Textarea
              placeholder="Enter cooking instructions/steps"
              value={instructions}
              onChange={(e) => {
                setInstructions(e.target.value);
                setIsFormTouched(true);
              }}
              className="border-[hsl(45,80%,85%)] text-[hsl(260,50%,40%)] bg-[hsl(45,80%,85%)]"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Description</label>
            <Textarea
              placeholder="Recipe description (optional)"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setIsFormTouched(true);
              }}
              className="border-[hsl(45,80%,85%)] text-[hsl(260,50%,40%)] bg-[hsl(45,80%,85%)]"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Cuisine Type</label>
            <Input
              placeholder="e.g., Italian, Greek"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setIsFormTouched(true);
              }}
              className="border-[hsl(45,80%,85%)] text-[hsl(260,50%,40%)] bg-[hsl(45,80%,85%)]"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Image URL</label>
            <Input
              placeholder="https://picsum.photos/200"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setIsFormTouched(true);
              }}
              className="border-[hsl(45,80%,85%)] text-[hsl(260,50%,40%)] bg-[hsl(45,80%,85%)]"
            />
          </div>

          <Button
            type="submit"
            className="mt-4 bg-[hsl(260,60%,80%)] hover:bg-[hsl(260,60%,75%)] w-full"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;

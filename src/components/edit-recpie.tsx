import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface EditRecipeProps {
  onSave: (newRecipe: any) => void;
  onClose: () => void;
  isPage?: boolean; // Distinguish between modal and page usage
  recipeId: string;
}

const EditRecipe: React.FC<EditRecipeProps> = ({
  onSave,
  onClose,
  isPage = false,
  recipeId,
}) => {
  const [name, setName] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isFormTouched, setIsFormTouched] = useState(false);

  const clearForm = () => {
    setName("");
    setCookTime("");
    setIngredients([""]);
    setInstructions("");
    setType("");
    setImageUrl("");
    setDescription("");
    setIsFormTouched(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !cookTime || !ingredients.length || !instructions || !type) {
      alert("Please fill in all required fields.");
      return;
    }

    const newRecipe = {
      title: name,
      description,
      image: imageUrl,
      cookTime,
      ingredients,
      instructions,
      type,
    };

    onSave(newRecipe);
    clearForm();
    onClose();
  };

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newIngredients = [...ingredients];
      newIngredients[index] = e.target.value;
      setIngredients(newIngredients);
      setIsFormTouched(true);
    };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
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
        <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
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
                  className="my-1"
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="ml-2 my-1 bg-red-500 hover:bg-red-600"
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddIngredient}
              className="mt-2 bg-blue-500 hover:bg-blue-600"
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
              className="w-full h-32"
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
              className="w-full h-32"
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
            />
          </div>

          <Button
            type="submit"
            className="mt-4 bg-green-500 hover:bg-green-600 w-full"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Recipe {
  id: string;
  name: string;
  instructions: string;
  imageUrl: string;
  cookTime: string;
  ingredients: string;
}

interface RecipeContextProps {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
}

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      name: "Churros",
      instructions: "Yummy yummy in my tummy!",
      imageUrl:
        "https://www.allrecipes.com/thmb/qq9s8jlKplKUDEo3Gtk15EAJpHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-recipe-24700-churros-VAT-hero-03-4x3-a7f6af1860934b0385f84ab9f13f2613.jpg",
      cookTime: "30 minutes",
      ingredients: "Flour, water, sugar, oil",
    },
    {
      id: "2",
      name: "Pasta",
      instructions: "Delicious homemade pasta",
      imageUrl:
        "https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg",
      cookTime: "30 minutes",
      ingredients: "Flour, water, sugar, oil",
    },
    {
      id: "3",
      name: "Salad",
      instructions: "A healthy green salad",
      imageUrl:
        "https://garlicsaltandlime.com/wp-content/uploads/2022/07/Garden-salad-thumbnail.jpg",
      cookTime: "30 minutes",
      ingredients: "Flour, water, sugar, oil",
    },
  ]);

  const addRecipe = (recipe: Recipe) => setRecipes((prev) => [...prev, recipe]);

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};

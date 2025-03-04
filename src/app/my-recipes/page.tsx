"use client";

import Link from "next/link";
import { useUser } from "@/components/user-context";
import { useState, useEffect } from "react";
import { Item } from "@/components/item";
import { Plus } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export interface Recipe {
  _id: string;
  title: string;
  image: string;
  updated_date: string;
  cookTime: string;
  ingredients: string[];
  instructions: string;
  description: string;
  type: string;
  user: string;
}

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { signedIn, user } = useUser(); // Assuming `user` contains the user's details including `_id`

  useEffect(() => {
    if (!user?._id) return;

    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/items?userId=${user._id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();

        const userRecipes = data.items.filter(
          (recipe: Recipe) => recipe.user === user._id,
        );
        setRecipes(userRecipes);
      } catch (err) {
        console.error(err);
        setError("Failed to load recipes. Please try again later.");
      }
    };

    fetchUserRecipes();
  }, [user?._id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex items-center space-x-2 m-1">
        <SidebarTrigger className="" />
        <h1 className="font-bold text-xl">My Recipes</h1>
        {signedIn && (
          <Link href="/add-recipe">
            <button className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 border border-input">
              <Plus size={16} />
              Add a Recipe
            </button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-2">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Item
              key={recipe._id}
              id={recipe._id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              user={recipe.user}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              cookTime={recipe.cookTime}
              type={recipe.type}
            />
          ))
        ) : (
          <p className="m-2 text-gray-600">You don’t have any recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

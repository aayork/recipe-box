"use client";

import { useUser } from "@/components/user-context";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Item } from "@/components/item";
import { Plus } from "lucide-react";
import { Header } from "@/components/header";
import { SearchResults } from "@/components/search-results";

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
  const { signedIn } = useUser();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/items/");
        if (!response.ok) throw new Error("Failed to fetch recipes");
        const data = await response.json();
        const sortedRecipes = data.items
          .sort(
            (a: Recipe, b: Recipe) =>
              new Date(b.updated_date).getTime() -
              new Date(a.updated_date).getTime(),
          )
          .slice(0, 15);
        setRecipes(sortedRecipes);
      } catch (err) {
        console.error(err);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <Header onSearchAction={(query: string) => setSearchQuery(query)} />
      <div className="flex items-center m-3">
        <h1 className="font-bold text-xl">New Recipes</h1>
        {signedIn && (
          <Link href="/add-recipe">
            <button className="flex items-center gap-2 m-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 border border-input">
              <Plus size={16} />
              Add a Recipe
            </button>
          </Link>
        )}
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : searchQuery ? (
        // Render filtered recipes when there's a search query
        <SearchResults recipes={recipes} searchQuery={searchQuery} />
      ) : (
        // Render all recipes when there's no search query
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-2">
          {recipes.map((recipe) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

"use client";

import { Item } from "./item";

interface SearchResultsProps {
  recipes: any[]; // Replace `any[]` with your Recipe type if available
  searchQuery: string;
}

export function SearchResults({ recipes, searchQuery }: SearchResultsProps) {
  // Filter recipes based on the search query
  const filteredRecipes = recipes.filter((recipe) =>
    [recipe.title, recipe.type, recipe.description]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  if (!filteredRecipes.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No recipes match your search.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredRecipes.map((recipe) => (
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
  );
}

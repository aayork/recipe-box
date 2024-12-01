"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface RecipeProps {
  id: string;
  title: string;
  cooktime: string;
  description: string;
  instructions: string; // Expected to be a string with steps separated by newlines
  ingredients: string[];
  image: string;
  type: string;
  user: string;
}

export function RecipeDetails({
  id,
  title,
  cooktime,
  description,
  instructions,
  ingredients,
  image,
  type,
  user,
}: RecipeProps) {
  return (
    <Card>
      <div className="flex flex-row">
        <div className="flex-1">
          <CardHeader>
            <CardTitle className="px-1 pt-1">{title}</CardTitle>
            <CardDescription className="px-1">
              {description} <span className="mx-1">• Time:</span> {cooktime}
            </CardDescription>
          </CardHeader>
          <div className="ml-1 mb-1 relative w-[400px] h-[360px] overflow-hidden rounded-xl">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        </div>
        <div className="w-px bg-border ml-1"></div>
        <div className="p-4 w-72">
          <CardContent className="flex flex-col space-y-4">
            <div>
              <p className="font-semibold mb-2">Ingredients</p>
              <ul className="list-disc list-inside text-sm">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Steps</p>
              <ol className="list-decimal list-inside text-sm">
                {instructions.split("\n").map((step, index) => (
                  <li key={index}>{step.trim()}</li>
                ))}
              </ol>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

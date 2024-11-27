import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, PencilLine, CircleX } from "lucide-react";
import { useUser } from "./user-context";
import { RecipeDetails } from "./recipe-details";
import Link from "next/link";

interface ItemProps {
  id: string;
  title: string;
  description: string;
  image: string;
  user: string;
  cookTime: string;
  instructions: string;
  ingredients: string[];
  type: string;
}

export function Item({
  id,
  title,
  description,
  image,
  user,
  cookTime,
  instructions,
  ingredients,
  type,
}: ItemProps) {
  const [liked, setLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // State to manage modal visibility
  const { user: currUser } = useUser();

  const toggleLike = () => setLiked((prev) => !prev);
  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <>
      <Card className="w-fit h-fit p-1">
        <div className="relative w-[200px] h-[180px] overflow-hidden rounded-xl">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <CardHeader>
          <CardTitle className="mt-1">{title}</CardTitle>
          <CardDescription className="max-w-[190px]">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={toggleDetails}>
              Details
            </Button>
            <div className="space-x-1">
              {currUser?._id === user && (
                <Link href={`/edit-recipe/${id}`} passHref>
                  <Button variant="outline">
                    <PencilLine />
                  </Button>
                </Link>
              )}
              <Button variant="outline" onClick={toggleLike}>
                <Heart className={liked ? "text-red-500" : "text-gray-500"} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div>
            <div className="flex justify-end">
              <Button
                className="absolute top-52 right-96 w-10 h-10 bg-white text-black shadow-md rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                onClick={toggleDetails}
              >
                <CircleX />
              </Button>
            </div>
            <RecipeDetails
              id={id}
              title={title}
              cooktime={cookTime}
              description={description}
              instructions={instructions}
              ingredients={ingredients}
              image={image}
              type={type}
              user={user}
            />
          </div>
        </div>
      )}
    </>
  );
}

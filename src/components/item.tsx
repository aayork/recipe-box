import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, PencilLine } from "lucide-react";
import { useState } from "react";
import { useUser } from "./user-context";

interface ItemProps {
  key: string;
  id: string;
  title: string;
  description: string;
  image: string;
  user: string;
}

export function Item({ id, title, description, image, user }: ItemProps) {
  const [liked, setLiked] = useState(false);
  const { user: currUser } = useUser(); // Destructure the user from useUser context

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
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
          <Button variant="outline">Details</Button>
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
  );
}

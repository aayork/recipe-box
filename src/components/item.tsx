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
      <div className="relative w-50 h-50">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="rounded-xl w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Button variant="outline">Info</Button>
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

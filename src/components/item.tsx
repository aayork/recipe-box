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
  title: string;
  description: string;
  image: string;
  user: string;
}

export function Item({ key, title, description, image, user }: ItemProps) {
  const [liked, setLiked] = useState(false);
  const { user: currUser } = useUser(); // Destructure the user from useUser context

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <Card className="w-fit h-fit p-1">
      <Image
        src={image}
        width={300}
        height={300}
        alt={`Picture of ${title}`}
        className="rounded-xl"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Button variant="outline">Info</Button>
          <div className="space-x-1">
            {currUser?._id === user && (
              <Link href={`/edit-recipe/${key}`} passHref>
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

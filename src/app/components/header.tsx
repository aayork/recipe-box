import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <div className="flex items-center justify-between p-1 w-full">
      <p></p>
      <h1 className="font-bold text-2xl">Welcome to Recipe Box!</h1>
      <div className="flex items-center">
        <Input className="w-56" type="search" placeholder="Search" />
        <Avatar className="w-8 h-8 ml-1">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

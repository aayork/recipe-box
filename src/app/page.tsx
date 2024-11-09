import Image from "next/image";
import { Header } from "./components/header";
import { Item } from "./components/item";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Item />
    </div>
  );
}

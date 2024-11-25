"use client";

import { useRouter } from "next/navigation";
import EditRecipe from "@/components/edit-recpie";

export default function EditRecipePage() {
  const router = useRouter();

  const handleSave = () => {
    router.push("/");
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen p-4">
      <EditRecipe onSave={handleSave} onClose={handleClose} isPage={true} />
    </div>
  );
}

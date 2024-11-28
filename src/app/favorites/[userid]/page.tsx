"use client";

import { useParams, useRouter } from "next/navigation";

export default function FavoritesPage() {
  const router = useRouter();
  const { userId } = useParams();

  if (!userId) {
    return (
      <div className="min-h-screen p-4">
        <p>Error: User not found.</p>
      </div>
    );
  }

  return <div className="min-h-screen p-4"></div>;
}

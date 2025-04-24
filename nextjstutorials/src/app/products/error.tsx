"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleReload = () => {
    setIsRefreshing(true);
    startTransition(() => {
      router.refresh();
      reset();
      setIsRefreshing(false); // This will fire immediately after transition starts
    });
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Error: {error.message}
      </h1>

      <button
        onClick={handleReload}
        disabled={isRefreshing}
        className={`px-4 py-2 rounded ${
          isRefreshing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isRefreshing ? "Reloading..." : "Reload"}
      </button>
    </div>
  );
}

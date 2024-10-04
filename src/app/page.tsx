"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="py-4 px-4">
      <h1>Welcome</h1>
      <div className="space-x-4 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => router.push("/register")}
        >
          Registration
        </button>
      </div>
    </div>
  );
}

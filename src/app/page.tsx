"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="py-20 px-4  ">
      <div className="mx-auto">
        <div className=" text-center">
          {" "}
          <div className="text-4xl text-gray-700">Welcome to WebAuth Demo</div>
          <div className="text-xl text-gray-500">
            First register your account and then login in to the app.
          </div>
        </div>
        <div className=" mt-4 flex flex-col justify-center items-center gap-3">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => router.push("/register")}
          >
            Registration
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Login() {
  const [username, setUsername] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async () => {
    try {
      // Step 1: Start login
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/start`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to start login");
      }

      const options = await response.json();

      // Step 2: Authenticate using the options
      const credential = await startAuthentication(options);

      if (!credential) {
        console.error(
          "No credential was returned, user may have canceled the operation."
        );
        return;
      }

      // Step 3: Send the credential to your backend for verification
      const verifyResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
          credentials: "include",
        }
      );

      const verifyData = await verifyResponse.json();

      // Check if verification was successful and redirect
      if (verifyResponse.ok) {
        // Redirect to the dashboard on successful login
        router.push("/dashboard");
      } else {
        console.error("Verification failed:", verifyData);
      }
    } catch (error) {
      console.error("Error during login process:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-2 pt-20">
      <div className="text-2xl text-center text-gray-700">
        Login into the app
      </div>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 w-[300px] border-black/20 border rounded-md"
      />
      <button
        className="p-2 bg-green-400 text-white rounded-md"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

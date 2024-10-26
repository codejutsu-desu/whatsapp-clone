"use client";
import React, { useState } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    console.log("Attempting to log in with username:", username); // Log the username
    if (!username.trim()) {
      console.error("Username cannot be empty");
      return; // Exit if username is empty
    }

    try {
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

      const options = await response.json();
      console.log("Received options:", options);

      const publicKeyOptions = {
        rpId: options.rpId,
        challenge: options.challenge,
        allowCredentials: options.allowCredentials,
        timeout: options.timeout,
        userVerification: options.userVerification,
      };

      const authOptions = { optionsJSON: publicKeyOptions };

      // Step 2: Authenticate using the options
      const credential = await startAuthentication(authOptions);
      console.log("Credential received:", credential);

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

      if (!verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        console.error("Verification failed:", verifyData);
        return; // Exit if verification failed
      }

      // If verification was successful, redirect to dashboard
      router.push("/dashboard");
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
        type="button" // Ensure it's a button, not a submit
        className="p-2 bg-green-400 text-white rounded-md"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

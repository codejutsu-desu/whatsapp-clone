"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { startRegistration } from "@simplewebauthn/browser";

export default function Register() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleRegister = async () => {
    try {
      // Step 1: Start registration
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register/start`,
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
        throw new Error("Failed to start registration");
      }

      const options = await response.json();
      console.log("Generated options:", options);

      // Step 2: Create a credential with options
      const credential = await startRegistration(options);
      console.log(credential);

      // Step 3: Format the credential
      const formattedCredential = {
        //change to labs1.kpay.uk
        rp: "localhost",
        id: credential.id,
        rawId: credential.rawId,
        type: credential.type,
        response: {
          attestationObject: credential.response.attestationObject,
          clientDataJSON: credential.response.clientDataJSON,
        },
      };

      // Step 4: Send the credential to the backend for verification
      const verifyResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register/verify`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedCredential),
        }
      );

      console.log(verifyResponse);

      const verifyData = await verifyResponse.json();
      console.log(verifyData);
      setMessage(verifyData.message);

      // Redirect to login page after successful registration
      if (verifyData.success) {
        router.push("/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Error during registration process:", error);
      setMessage("Registration failed: " + error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-2 pt-20">
      <div className="text-2xl text-center text-gray-700">
        Register into the app
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
        onClick={handleRegister}
      >
        Register
      </button>
      {message && <div className="mt-2 text-center">{message}</div>}
    </div>
  );
}

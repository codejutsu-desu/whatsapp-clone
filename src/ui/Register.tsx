"use client";
import React, { useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";

export default function Register() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

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
        rp: "labs1.kpay.uk",
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

      if (!verifyResponse.ok) {
        throw new Error("Failed to verify credential");
      }

      const verifyData = await verifyResponse.json();
      console.log(verifyData);
      setMessage(verifyData.message);
    } catch (error) {
      console.error("Error during registration process:", error);
      console.log("here is the error");
      setMessage("Registration failed: " + error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-2 pt-20">
      <div className="text-2xl text-center">Register into the app</div>
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

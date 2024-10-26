"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { startRegistration } from "@simplewebauthn/browser";

export default function Register() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
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

      // Convert challenge to base64url string and user.id to base64url string
      const publicKeyOptions = {
        challenge: options.challenge,
        rp: options.rp,
        user: {
          id: options.user.id,
          name: options.user.name,
          displayName: options.user.displayName,
        },
        pubKeyCredParams: options.pubKeyCredParams,
        timeout: options.timeout,
        attestation: options.attestation,
        authenticatorSelection: options.authenticatorSelection,
        excludeCredentials: options.excludeCredentials,
        extensions: options.extensions,
      };

      // Wrap the options in optionsJSON
      const registrationOptions = { optionsJSON: publicKeyOptions };

      // Pass the formatted options to startRegistration
      const credential = await startRegistration(registrationOptions);

      const formattedCredential = {
        id: credential.id,
        rawId: credential.rawId,
        type: credential.type,
        response: {
          attestationObject: credential.response.attestationObject,
          clientDataJSON: credential.response.clientDataJSON,
        },
      };

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

      const verifyData = await verifyResponse.json();
      setMessage(verifyData.message);

      if (verifyData.success) {
        router.push("/login");
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

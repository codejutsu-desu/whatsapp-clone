"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { startRegistration } from "@simplewebauthn/browser";
// TODO: Import a toast notification library like react-toastify to handle user feedback

export default function Register() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // TODO: Add loading state to indicate process progress
  const router = useRouter();

  const handleRegister = async () => {
    // TODO: Add client-side validation to ensure username is not empty
    if (!username) {
      // TODO: Show toast error message: "Username cannot be empty."
      return;
    }

    setIsLoading(true); // TODO: Set loading to true when starting registration
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
        // TODO: Show toast error message if registration initiation fails
        throw new Error("Failed to start registration");
      }

      const options = await response.json();

      // TODO: Handle converting challenge and user ID to base64url if necessary
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

      const registrationOptions = { optionsJSON: publicKeyOptions };

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

      // TODO: Check if `verifyData` includes `status: "success"` to confirm registration
      if (verifyData.status === "success") {
        // TODO: Show toast success message for successful registration
        router.push("/login");
      } else {
        // TODO: Show toast error message for failed registration
      }
    } catch (error) {
      console.error("Error during registration process:", error);
      // TODO: Show a generic toast error message on catch, e.g., "Registration failed. Please try again."
    } finally {
      setIsLoading(false); // TODO: Reset loading state when registration process completes
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
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
      {message && <div className="mt-2 text-center">{message}</div>}{" "}
    </div>
  );
}

"use client";
import React, { useState } from "react"; // Import useState
import { startAuthentication } from "@simplewebauthn/browser";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Add loading state

  const handleLogin = async () => {
    setLoading(true); // Set loading to true at the start of the process
    try {
      // Step 1: Send a request to initiate authentication
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/start`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to start authentication");
        setLoading(false); // Set loading to false on failure
        return;
      }

      const options = await response.json();
      console.log("Received options:", options);

      const authOptions = {
        optionsJSON: {
          rpId: options.rpId,
          challenge: options.challenge,
          allowCredentials: options.allowCredentials,
          timeout: options.timeout,
          userVerification: options.userVerification,
        },
      };

      // Step 2: Authenticate using the options
      const credential = await startAuthentication(authOptions);
      console.log("Credential received:", credential);

      if (!credential) {
        console.error(
          "No credential was returned; user may have canceled the operation."
        );
        setLoading(false); // Set loading to false if no credential
        return;
      }

      // Step 3: Send the credential to the backend for verification
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
        setLoading(false); // Set loading to false if verification fails
        return;
      }

      // If verification is successful, redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during login process:", error);
    } finally {
      setLoading(false); // Ensure loading is false in any case
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-2 pt-20">
      <div className="text-2xl text-center text-gray-700">
        Login into the app
      </div>
      <button
        type="button" // Ensure it's a button, not a submit
        className={`p-2 bg-green-400 text-white rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleLogin}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <span>Loading...</span> // Display loading text
        ) : (
          <span>Login with Passkey</span>
        )}
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Core } from "@walletconnect/core";
import { WalletKit, WalletKitTypes } from "@reown/walletkit";

export const HashConnectClient = () => {
  const [kit, setKit] = useState(null);
  const [uri, setUri] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("hedera:testnet"); // State to store network selection
  const [qrCodeVisible, setQrCodeVisible] = useState(false);

  const initializeWalletKit = async () => {
    try {
      const core = new Core({
        projectId: "53db41bfb52ee26d9a304025f741ee18",
      });

      const walletKit = await WalletKit.init({
        core,
        metadata: {
          name: "Demo app",
          description: "Demo Client as Wallet/Peer",
          url: "https://reown.com/walletkit",
          icons: [],
        },
      });

      console.log("WalletKit initialized:", walletKit);
      setKit(walletKit);
    } catch (error) {
      console.error("Error initializing WalletKit:", error);
    }
  };

  const handleNetworkChange = (event) => {
    setSelectedNetwork(event.target.value); // Set network based on user selection
  };

  const handleConnect = async () => {
    // Check if kit was initialized successfully
    if (!kit) {
      console.error("WalletKit not initialized yet");
      return;
    }

    // Create pairing URI and initiate pairing
    const { topic, uri } = await kit.core.pairing.create();
    setUri(uri); // Display QR code
    setQrCodeVisible(true);
    console.log("Generated pairing URI:", uri);
    console.log("Pairing topic:", topic);
    try {
      // Listen for session proposal only after WalletKit is initialized
      kit.on(
        "session_proposal",
        async (proposal: WalletKitTypes.SessionProposal) => {
          console.log("Session proposal received:", proposal);

          try {
            const session = await kit.approveSession({
              id: proposal.id,
            });
            console.log("Session approved:", session);
          } catch (error) {
            console.error("Error approving session:", error);
          }
        }
      );

      await kit.pair({ uri });
      console.log(`Pairing initiated on ${selectedNetwork} with URI:`, uri);
    } catch (error) {
      console.error("Failed to pair with wallet:", error);
    }
  };

  useEffect(() => {
    // Initialize WalletKit on mount
    initializeWalletKit();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      {/* Dropdown to select the network (mainnet or testnet) */}
      <select
        className="mb-4 bg-gray-200 p-2 rounded"
        value={selectedNetwork}
        onChange={handleNetworkChange} // Handle network change
      >
        <option value="hedera:testnet">Testnet</option>
        <option value="hedera:mainnet">Mainnet</option>
      </select>

      <button
        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
        onClick={handleConnect}
      >
        Connect to Wallet
      </button>

      {qrCodeVisible && uri && (
        <div className="mt-4">
          <p className="mb-2">Scan this QR code to connect:</p>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              uri
            )}`}
            alt="QR Code"
          />
        </div>
      )}
    </div>
  );
};

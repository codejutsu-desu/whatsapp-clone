"use client";
import { useEffect, useState } from "react";
import {
  getConnectedAccountIds,
  hc,
  hcInitPromise,
} from "../services/hashconnect";

export const HashConnectClient = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [accountIds, setAccountIds] = useState<string[]>([]);

  const syncWithHashConnect = () => {
    const connectedAccountIds = getConnectedAccountIds();
    console.log("Connected Account IDs: ", connectedAccountIds);

    if (connectedAccountIds.length > 0) {
      setAccountIds(connectedAccountIds.map((o) => o.toString()));
      setIsConnected(true);
    } else {
      setAccountIds([]);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    hcInitPromise
      .then(() => {
        console.log("HashConnect initialized successfully", hc);
        syncWithHashConnect(); // Ensure this is called after successful init
      })
      .catch((error) => {
        console.error("Error initializing HashConnect:", error);
      });

    // Setting up event listeners
    hc.pairingEvent.on(syncWithHashConnect);
    hc.disconnectionEvent.on(syncWithHashConnect);
    hc.connectionStatusChangeEvent.on(syncWithHashConnect);

    return () => {
      hc.pairingEvent.off(syncWithHashConnect);
      hc.disconnectionEvent.off(syncWithHashConnect);
      hc.connectionStatusChangeEvent.off(syncWithHashConnect);
    };
  }, []);

  const handleConnectDisconnect = async () => {
    await hcInitPromise; // Wait for the initialization promise

    if (isConnected) {
      if (accountIds.length > 0) {
        hc.disconnect(); // Disconnecting logic
        console.log("Disconnected");
      }
    } else {
      console.log("Opening pairing modal...");
      hc.openPairingModal(); // This should generate the pairing string
      console.log("Pairing string created:", hc.pairingString);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleConnectDisconnect}
      >
        {isConnected
          ? `Disconnect Account${accountIds.length > 1 ? "s" : ""}`
          : "Connect"}
      </button>
    </div>
  );
};

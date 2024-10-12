"use client";
import { useEffect, useState } from "react";
import {
  getConnectedAccountIds,
  hc,
  hcInitPromise,
  initHashConnect,
} from "../services/hashconnect";

export const HashConnectClient = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [accountIds, setAccountIds] = useState<string[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState("testnet"); // Default to testnet

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
    if (!isConnected) {
      // Initialize HashConnect with the selected network (testnet/mainnet)
      await initHashConnect(selectedNetwork);
    }

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
      <div className="flex flex-col items-center">
        {/* Dropdown for selecting network */}
        <select
          className="mb-4 bg-gray-200 p-2 rounded"
          value={selectedNetwork}
          onChange={(e) => setSelectedNetwork(e.target.value)}
          disabled={isConnected} // Disable network selection when connected
        >
          <option value="testnet">Testnet</option>
          <option value="mainnet">Mainnet</option>
        </select>

        {/* Connect/Disconnect Button */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleConnectDisconnect}
        >
          {isConnected
            ? `Disconnect Account${accountIds.length > 1 ? "s" : ""}`
            : "Connect"}
        </button>
      </div>
    </div>
  );
};

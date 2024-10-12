import { LedgerId } from "@hashgraph/sdk";
import { HashConnect } from "hashconnect";

// Dummy metadata
const appMetadata = {
  name: "Example dApp",
  description: "An example HashConnect dApp",
  icons: ["https://dummyimage.com/64x64/000/fff&text=Icon"], // Dummy icon
  url: "https://example.com", // Dummy URL
};

// Project ID
const projectId = "91a0448a28a02b97186e214ba8bf291a"; // Your actual project ID

// Initialize HashConnect object (declared outside to maintain event listeners)
export let hc: HashConnect;
export let hcInitPromise: Promise<void>;

// Function to initialize HashConnect with the selected network
export const initHashConnect = (network: string) => {
  const ledgerId = LedgerId.fromString(network); // Select network (mainnet/testnet)
  hc = new HashConnect(ledgerId, projectId, appMetadata, true);

  hcInitPromise = hc
    .init()
    .then(() => {
      console.log(`HashConnect initialized successfully on ${network}`);
    })
    .catch((error) => {
      console.error("HashConnect init error:", error);
    });

  return hcInitPromise;
};

// Function to get connected accounts
export const getConnectedAccountIds = () => {
  return hc.connectedAccountIds || [];
};

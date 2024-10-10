import { LedgerId } from "@hashgraph/sdk";
import { HashConnect } from "hashconnect";

// Dummy metadata
const appMetadata = {
  name: "Example dApp",
  description: "An example HashConnect dApp",
  icons: ["https://dummyimage.com/64x64/000/fff&text=Icon"], // Dummy icon
  url: "https://example.com", // Dummy URL
};

const net = "testnet"; // or "mainnet"

// Check if the project ID is defined
const projectId = "91a0448a28a02b97186e214ba8bf291a"; // Ensure this is your actual project ID

// Initialize HashConnect
export const hc = new HashConnect(
  LedgerId.fromString(net),
  projectId,
  appMetadata,
  true // Set to true to use local storage for pairing
);

console.log(hc);

// Function to get connected accounts
export const getConnectedAccountIds = () => {
  return hc.connectedAccountIds || [];
};

// Initialize HashConnect promise
export const hcInitPromise = hc
  .init()
  .then(() => {
    console.log("HashConnect init successful");
  })
  .catch((error) => {
    console.error("HashConnect init error:", error);
  });

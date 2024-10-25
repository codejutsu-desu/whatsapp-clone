import { LedgerId } from "@hashgraph/sdk";
import { HashConnect } from "hashconnect";

// Define application metadata
const appMetadata = {
  name: "Example dApp",
  description: "An example HashConnect dApp",
  icons: ["https://dummyimage.com/64x64/000/fff&text=Icon"],
  url: "https://example.com",
};

// Project ID from your HashConnect setup
const projectId = "91a0448a28a02b97186e214ba8bf291a";

// Initialize HashConnect instance globally
let hc: HashConnect | null = null;

export const initHashConnect = async (network: string, walletType: string) => {
  const ledgerId = LedgerId.fromString(network); // Determine the network

  // Initialize HashConnect
  hc = new HashConnect(ledgerId, projectId, appMetadata, true);

  try {
    await hc.init(); // Initialize HashConnect
    console.log(`HashConnect initialized for ${walletType} on ${network}`);

    hc.openPairingModal();
  } catch (error) {
    console.error(`Error initializing HashConnect for ${walletType}:`, error);
  }
};

export const disconnectHashConnect = async () => {
  if (hc) {
    hc.disconnect();
    console.log("Wallet disconnected");
  }
};

// Get connected account IDs
export const getConnectedAccountIds = () => {
  return hc ? hc.connectedAccountIds || [] : [];
};

//show account

// Function to initialize HashConnect and return connected accounts (without showing the pairing modal)
export const initHashConnectAndShowAccount = async (
  network: string,
  walletType: string
): Promise<string[]> => {
  const ledgerId = LedgerId.fromString(network); // Determine the network

  // Initialize HashConnect
  hc = new HashConnect(ledgerId, projectId, appMetadata, true);

  try {
    await hc.init(); // Initialize HashConnect
    console.log(`HashConnect initialized for ${walletType} on ${network}`);

    // Fetch the connected account IDs (if any)
    const connectedAccountIds = getConnectedAccountIds();

    if (connectedAccountIds.length > 0) {
      // Convert each AccountId to a string
      const accountIdsAsString = connectedAccountIds.map((id: AccountId) =>
        id.toString()
      );
      console.log("Connected Account IDs as strings:", accountIdsAsString);
      return accountIdsAsString; // Return the account IDs as strings
    } else {
      console.log("No connected accounts found.");
      return []; // No connected accounts
    }
  } catch (error) {
    console.error(`Error initializing HashConnect for ${walletType}:`, error);
    return [];
  }
};

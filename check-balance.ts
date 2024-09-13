import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

// Array of famous Solana wallet addresses
const famousWallets = [
  "4pG2sP6hUyd8bUpP9w1j6ZY9wUhHHnG7rL9sqmtfEp8z",  // shaq.sol
  "54V65BmfK9WxN1y42DWf7LPyBE9JFAmsNV5n8y28f7kX"   // mccann.sol
];

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

(async () => {
  for (const walletAddress of famousWallets) {
    try {
      const publicKey = new PublicKey(walletAddress);
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

      console.log(
        `✅ The balance for the wallet at address ${publicKey.toBase58()} is ${balanceInSOL} SOL!`
      );
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("Invalid public key")) {
        console.error(`❌ Invalid public key provided: ${walletAddress}`);
      } else {
        console.error(`❌ An unexpected error occurred for ${walletAddress}:`, error.message);
      }
    }
  }
})();

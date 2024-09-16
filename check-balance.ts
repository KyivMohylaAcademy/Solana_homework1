import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

const publicKey = new PublicKey(suppliedPublicKey);
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

try {
  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL} SOL!`
  );
} catch (error) {
  console.error("❌ Error occurred while fetching the balance:", error.message);

  if (error.message.includes("Invalid public key input")) {
    console.error("❌ The provided public key is invalid.");
  }
}

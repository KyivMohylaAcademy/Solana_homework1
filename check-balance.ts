import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
 
const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

let publicKey;
try {
  
  publicKey = new PublicKey(suppliedPublicKey);
  if (!PublicKey.isOnCurve(publicKey)) {
    throw new Error("Invalid wallet address!");
  }
} catch (error) {
  console.error("Error: Invalid wallet address provided:", (error as Error).message);
  process.exit(1);
}

//const connection = new Connection("https://api.mainnet.solana.com", "confirmed");

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
 
const balanceInLamports = await connection.getBalance(publicKey);
 
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
 
console.log(
  `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
);

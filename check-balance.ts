import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

let publicKey: PublicKey;

try {
  publicKey = new PublicKey(suppliedPublicKey);
} catch (error) {
  if (error instanceof Error) {
    console.error(`Invalid public key format: ${error.message}`);
  } else {
    console.error("An unknown error occurred during public key creation.");
  }
  process.exit(1); 
}

try {
  const balanceInLamports = await connection.getBalance(publicKey);

  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  console.log(`✅ Finished! The balance for the wallet at address ${publicKey.toBase58()} is ${balanceInSOL} SOL!`);
  
} catch (error) {
  if (error instanceof Error) {
    console.error(`Failed to fetch balance: ${error.message}`);
  } else {
    console.error("An unknown error occurred while fetching the balance.");
  }
  process.exit(1); 
}

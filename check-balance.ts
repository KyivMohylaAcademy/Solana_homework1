import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
 
const publicKey = new PublicKey("5cn67SyANCCDHCCYGTwhKdwnvibKypDarn2eFDViAdwU");
 
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
// import { clusterApiUrl } from "@solana/web3.js";
// const connection = new Connection(clusterApiUrl("devnet"));
 
const balanceInLamports = await connection.getBalance(publicKey);
 
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
 
console.log(
  `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
);

 
const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}
  
const publicKey2 = new PublicKey(suppliedPublicKey);
 
const balanceInLamports2 = await connection.getBalance(publicKey);
 
const balanceInSOL2 = balanceInLamports / LAMPORTS_PER_SOL;
 
console.log(
  `✅ Finished! The balance for the wallet at address ${publicKey2} is ${balanceInSOL2}!`,
);

// get SOL to your devnet account by 
// link: https://faucet.solana.com/
// in CLI : solana airdrop <amount>
/* await airdropIfRequired(
  connection,
  keypair.publicKey,
  1 * LAMPORTS_PER_SOL,
  0.5 * LAMPORTS_PER_SOL,
);
*/

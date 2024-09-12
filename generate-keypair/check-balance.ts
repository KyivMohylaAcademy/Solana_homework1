import { Connection, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
 
const suppliedPublicKey = process.argv[2];
let net = process.argv[3];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}
 if (!net) {
    net = "devnet"
 }
const connection = new Connection(clusterApiUrl(net), "confirmed");

if (connection == null) {
    throw new Error("Cannot connect to the solana")
}
 
const publicKey = new PublicKey(suppliedPublicKey);
 
const balanceInLamports = await connection.getBalance(publicKey);
 
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
 
console.log(
  `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
);


import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
 
const keypair = getKeypairFromEnvironment("SECRET_KEY");
 
const publicKey = keypair.publicKey;
 
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
 
const balanceInLamports = await connection.getBalance(publicKey);
 
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
 
console.log(
  `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
); 
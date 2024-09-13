import * as dotenv from "dotenv";
dotenv.config();
import * as web3 from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new web3.PublicKey(suppliedToPubkey);

const connection = new web3.Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const transaction = new web3.Transaction();

const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = web3.SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [senderKeypair]
);

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);

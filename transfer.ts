import "dotenv/config";
import {
    Connection,
    Keypair,
    clusterApiUrl,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    TransactionInstruction,
} from "@solana/web3.js";

// load keys

let privateKey = process.env["SECRET_KEY"];
if (!privateKey) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

// send money

const recip = new PublicKey(process.argv[2] || "DMWvEfaUU9DXTiPMHisLq9zh2LExwffkDDBTHzqpRW8c");

const transaction = new Transaction();

const instruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recip,
    lamports: 0.01 * LAMPORTS_PER_SOL,
});

transaction.add(instruction);

// add memo

const memoProgram = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log(
    `💸 Finished! Sent 0.01 SOL to the address ${recip}. `,
  );
console.log(`Transaction confirmed, signature: ${signature}!`);
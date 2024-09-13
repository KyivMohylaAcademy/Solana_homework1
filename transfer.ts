import { Connection, Transaction, PublicKey, SystemProgram, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from "@solana/web3.js";

require('dotenv').config();
const { getKeypairFromEnvironment } = require('@solana-developers/helpers');

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
// import { Keypair } from "@solana/web3.js";
// const senderKeypair = Keypair.fromSecretKey(new Uint8Array([194, 158,  91, 218,   3, 194,  64, 218,  71,  17,  59,
//     228, 208,  56, 195, 175,  31, 252,  89,  24, 177,  72,
//     128,  76, 146,  29, 101, 121,  74, 148, 228, 239,  68,
//     153,  14, 172, 249, 204, 236, 185,  75,  31,  64,  61,
//     141, 201,  70, 142, 241, 146,  57, 148, 209, 162, 163,
//     155,  62,  11, 253,   4,  39, 133, 238, 223]));

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);
console.log(senderKeypair.publicKey)

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(await connection.getBalance(senderKeypair.publicKey) / LAMPORTS_PER_SOL)

const toPubkey = new PublicKey(suppliedToPubkey);


console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
);


const transaction = new Transaction();

const LAMPORTS_TO_SEND = LAMPORTS_PER_SOL;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_PER_SOL,
});


transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
]);

console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
);
console.log(`Transaction signature is ${signature}!`);

/*
All transactions on the blockchain are publicly viewable on the Solana Explorer. 
For example, you could take the signature returned by sendAndConfirmTransaction() in the example above, 
search for that signature in the Solana Explorer.
*/
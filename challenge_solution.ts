import web3 from "@solana/web3.js";
import * as dotenv from "dotenv"
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { dot } from "node:test/reporters";

const receiver_address = new web3.PublicKey(
    process.argv[2]
);
const receiver_data_address = new web3.PublicKey(
    process.argv[3]
);
dotenv.config()

const payer = getKeypairFromEnvironment("SECRET_KEY");

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
console.log("connected")

const newBalance = await airdropIfRequired(
    connection,
    payer.publicKey,
    1 * web3.LAMPORTS_PER_SOL,
    0.5 * web3.LAMPORTS_PER_SOL,
  );  


const transaction = new web3.Transaction();

const programId = new web3.PublicKey(receiver_address);
const receiverDataId = new web3.PublicKey(receiver_data_address);

const instruction = new web3.TransactionInstruction({
  keys: [
    {
      pubkey: receiverDataId,
      isSigner: false,
      isWritable: true,
    },
  ],
  programId,
});

transaction.add(instruction);

const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer]
);

console.log(`Transaction completed! Signature - ${signature}`);


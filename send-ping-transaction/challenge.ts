import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import * as web3 from "@solana/web3.js";

const main = async () => {

    const CLUSTER = "devnet"

    const suppliedToPubkey = process.argv[2] || null;

    if (!suppliedToPubkey) {
        console.log("Please provide a public key to send to");
        process.exit(1);
    }

    const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
    console.log(`🤠 Recipient Public Key: ${suppliedToPubkey}`);
    const toPubkey = new PublicKey(suppliedToPubkey);

    const connection = new web3.Connection(web3.clusterApiUrl(CLUSTER));
    console.log(`✅ Connected to Solana ${CLUSTER}!`);

    const transaction = new Transaction();
    const LAMPORTS_TO_SEND = 500000000; // 0.5 SOL

    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey,
        lamports: LAMPORTS_TO_SEND,
    });

    transaction.add(sendSolInstruction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [
        senderKeypair,
    ]);

    console.log(`💸 Successfully sent 0.5 SOL to ${toPubkey.toBase58()}`);
    console.log(`🤑 Transaction Signature: ${signature}`);
    console.log(`💰 View the transaction at: \nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);
};


main();
import * as web3 from "@solana/web3.js";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram } from "@solana/web3.js";
import "dotenv/config";
import bs58 from "bs58";

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const sendSol = async (fromKey: Keypair, toKey: PublicKey, amountSol: number) => {
    const transaction = new web3.Transaction().add(
        SystemProgram.transfer({
            fromPubkey: fromKey.publicKey,
            toPubkey: toKey,
            lamports: amountSol * LAMPORTS_PER_SOL,
        })
    );
    return await sendAndConfirmTransaction(connection, transaction, [fromKey]);
};

const getWalletBalance = async (publicKey: PublicKey) => {
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
};

const main = async () => {
    try {
        const [solToSend, senderPrivateKey, receiverPublicKey] = process.argv.slice(2);
        const amountSol = parseFloat(solToSend);
        if (isNaN(amountSol) || amountSol <= 0) {
            throw new Error("Sol amount must be a positive number.");
        }

        const senderKeyPair = Keypair.fromSecretKey(bs58.decode(senderPrivateKey));
        const receiverKey = new PublicKey(receiverPublicKey);

        console.log("💸📈 Before transaction:");
        console.log(`⬆️ Sender has ${await getWalletBalance(senderKeyPair.publicKey)} SOL.`);
        console.log(`⬇️ Receiver has ${await getWalletBalance(receiverKey)} SOL.`);

        const signature = await sendSol(senderKeyPair, receiverKey, amountSol);
        console.log(`\n✅ Transaction successful with signature: ${signature}`);
        console.log(`🔗 Explorer link: https://explorer.solana.com/tx/${signature}?cluster=devnet`);

        console.log("\n📊 After transaction:");
        console.log(`⬆️ Sender has ${await getWalletBalance(senderKeyPair.publicKey)} SOL.`);
        console.log(`⬇️ Receiver has ${await getWalletBalance(receiverKey)} SOL.`);
    } catch (error) {
        console.error(error);
    }
};

main();

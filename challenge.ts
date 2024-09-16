import * as web3 from "@solana/web3.js";
import {Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram} from "@solana/web3.js";
import "dotenv/config";
import bs58 from "bs58";

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const sendSol = async (fromKey : Keypair, toKey : PublicKey, amountSol : number) => {
    const senderKeypair = fromKey;
    const receiver = toKey;
    const transaction = new web3.Transaction();
    const intruction = SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: receiver,
        lamports: amountSol * LAMPORTS_PER_SOL,
    });
    transaction.add(intruction);
    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [senderKeypair],
    );
    return signature;
}

const getSolanaWalletBalance = async (publicKeyInput : string) => {
    const publicKey = new PublicKey(publicKeyInput);
    const balanceInLamports = await connection.getBalance(publicKey);
    return balanceInLamports / LAMPORTS_PER_SOL;
};

// enter the amount of sol, private key, public key to which the sol will be sent
const main = async () => {
    try {
        const solToSend = parseFloat(process.argv[2]);
        if (isNaN(solToSend) || solToSend <= 0) {
            throw new Error("Sol amount must be a positive number.");
        }

        const senderKeyPair = Keypair.fromSecretKey(bs58.decode(process.argv[3]));
        const receiverKey = new PublicKey(process.argv[4]);

        let senderBalance = await getSolanaWalletBalance(senderKeyPair.publicKey.toString());
        let receiverBalance = await getSolanaWalletBalance(receiverKey.toString());

        console.log("💸📈");
        console.log(`Before transaction:`);
        console.log(`⬆️ Sender ${senderKeyPair.publicKey.toString()} has ${senderBalance} SOL on balance.`);
        console.log(`⬇️ Receiver ${receiverKey.toString()} has ${receiverBalance} SOL on balance.`);

        const signature = await sendSol(senderKeyPair, receiverKey, solToSend);

        console.log(`\n✅ Transaction successful with signature: ${signature}`);
        console.log(
            `🔗 You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
        );

        senderBalance = await getSolanaWalletBalance(senderKeyPair.publicKey.toString());
        receiverBalance = await getSolanaWalletBalance(receiverKey.toString());

        console.log(`\nAfter transaction:`);
        console.log(`⬆️ Sender ${senderKeyPair.publicKey.toString()} has ${senderBalance} SOL on balance.`);
        console.log(`⬇️ Receiver ${receiverKey.toString()} has ${receiverBalance} SOL on balance.`);

    } catch (error) {
        console.error(error);
    }
}
main();


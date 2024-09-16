import {
    Connection,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    PublicKey,
} from "@solana/web3.js";
import "dotenv/config";
// you can use key from .env.example, it has some sol
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const getSolanaPriceInUSD = async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
    const data = await response.json();
    return data.solana.usd;
};

const main = async () => {
    const suppliedToPubkey = process.argv[2] || null;
    if (!suppliedToPubkey) {
        console.log(`Please provide a public key to receive.`);
        process.exit(1);
    }

    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

    const toPubkey = new PublicKey(suppliedToPubkey);

    console.log(
        `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
    );

    const transaction = new Transaction();

    const LAMPORTS_TO_SEND = 3006;

    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey,
        lamports: LAMPORTS_TO_SEND,
    });

    transaction.add(sendSolInstruction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [
        senderKeypair,
    ]);

    const solPriceInUSD = await getSolanaPriceInUSD();

    const sentSolInUSD =  LAMPORTS_TO_SEND / LAMPORTS_PER_SOL * solPriceInUSD;

    console.log(
        `💸 Finished! Sent ${LAMPORTS_TO_SEND} Lamports (${LAMPORTS_TO_SEND/LAMPORTS_PER_SOL}Sol) to the address ${toPubkey}. `,
        `\nApproximately $${sentSolInUSD} USD! (current rate $${solPriceInUSD})`
    );
    console.log(
        `\nTransaction signature is ${signature}!`,
        `\nYou can view your transaction on Solana Explorer at:https://explorer.solana.com/tx/${signature}?cluster=devnet`
        );

    const senderBalance = await connection.getBalance(senderKeypair.publicKey);
    const suppliedToBalance = await connection.getBalance(toPubkey);
    console.log(`Sender balance: ${senderBalance / LAMPORTS_PER_SOL} Sol, approximately $${senderBalance / LAMPORTS_PER_SOL * solPriceInUSD}. (current rate $${solPriceInUSD})`);
    console.log(`Receiver balance: ${suppliedToBalance / LAMPORTS_PER_SOL} Sol,  approximately $${suppliedToBalance / LAMPORTS_PER_SOL * solPriceInUSD}. (current rate $${solPriceInUSD})`);
}

main();

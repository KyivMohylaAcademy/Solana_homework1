import * as web3 from "@solana/web3.js";
// you can use key from .env.example
import "dotenv/config";
import {
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";

const main = async () => {
    const payer = getKeypairFromEnvironment("SECRET_KEY");
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

    const PING_PROGRAM_ADDRESS = new web3.PublicKey(
        "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa",
    );
    const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
        "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",
    );

    const transaction = new web3.Transaction();
    const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
    const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

    const instruction = new web3.TransactionInstruction({
        keys: [
            {
                pubkey: pingProgramDataId,
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
        [payer],
    );

    console.log(`✅ Transaction completed! Signature is ${signature}`);

    console.log(
        `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
    );
}

main();
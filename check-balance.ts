import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const getSolanaWalletBalance = async (publicKeyInput : string) => {
    const publicKey = new PublicKey(publicKeyInput);
    const balanceInLamports = await connection.getBalance(publicKey);
    return balanceInLamports / LAMPORTS_PER_SOL;
}

const main = async () => {

    const suppliedPublicKey = process.argv[2];
    if (!suppliedPublicKey) {
        throw new Error("Provide a public key to check the balance of!");
    }
    const balanceInSOL = await getSolanaWalletBalance(suppliedPublicKey);
    console.log(
        `✅ Finished! The balance for the wallet at address ${suppliedPublicKey} is ${balanceInSOL}!`,
    );
}

main();
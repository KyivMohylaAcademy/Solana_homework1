import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!");
}

const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

let publicKey: PublicKey;

try {
    publicKey = new PublicKey(suppliedPublicKey);
} catch (e) {
    console.error(e.message);
    process.exit(404);
}

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
);
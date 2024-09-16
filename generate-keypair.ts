import "dotenv/config";
import { Keypair } from "@solana/web3.js";

let privateKey = process.env["SECRET_KEY"];

if (!privateKey) {
    console.log("Missing secret key! Create a new one in .env file");
    process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);

console.log('Loaded Public key: ', keypair.publicKey.toBase58());
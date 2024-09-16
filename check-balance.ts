import "dotenv/config";
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
} from "@solana/web3.js";

const key = process.argv[2];

const connection = new Connection(clusterApiUrl("devnet"));
console.log('connected to devnet')

const publicKey = new PublicKey(key);
const balanceInLamPorts = await connection.getBalance(publicKey);

const balanceInSol = balanceInLamPorts / LAMPORTS_PER_SOL;

console.log('Finished! There is', balanceInSol, 'SOL on wallet', key);
import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL} from "@solana/web3.js";

const main = async () => {
    const connection = new Connection(clusterApiUrl("devnet"));
    const address = new PublicKey("AgmYGkskk9eNAb1M2dG35bRznGNCm1tG5Qb8aZSQSSYe");
    const balance = await connection.getBalance(address);
    const balanceInSol = balance/LAMPORTS_PER_SOL;


    console.log(`✅ Connected!`);
    console.log(`The balance of the account at ${address} is ${balance} lamports what is ${balanceInSol} SOL`);
    console.log(`✅ Finished!`);
}

main();

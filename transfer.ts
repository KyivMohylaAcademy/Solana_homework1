import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
 
let wallets: string[] = [
  'gacMrsrxNisAhCfgsUAVbwmTC3w9nJB6NychLAnTQFv', //shaq.sol
  'GitYucwpNcg6Dx1Y15UQ9TQn8LZMX1uuqQNn8rXxEWNC' //biggest holder
]

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

for (const address of wallets) {
  try {
    const publicKey = new PublicKey(address);
    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
  );
  } catch (error) {
    console.error(`Error: Invalid wallet address ${address} or issue fetching balance.`);
  }
}
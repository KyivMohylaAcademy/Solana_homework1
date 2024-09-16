//commented is for loading an existing keypair from an .env file

import "dotenv/config";
//import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);
console.log(`✅ Finished!`);
//const keypair = getKeypairFromEnvironment("SECRET_KEY");

// console.log(
//     `✅ Finished! We've loaded our secret key securely, using an env file!`,
// );
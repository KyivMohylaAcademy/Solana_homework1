import { Keypair } from "@solana/web3.js";

const keypair1 = Keypair.generate();

console.log(`✅ Generated keypair!`);

console.log(`The public key is: `, keypair1.publicKey.toBase58());
console.log(`The secret key is: `, keypair1.secretKey);
console.log(`✅ Finished!`);

require('dotenv').config();
const { getKeypairFromEnvironment } = require('@solana-developers/helpers');

const keypair2 = getKeypairFromEnvironment("SECRET_KEY");
 
console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`,
);

// to run typescript file in the terminal/cmd: npx esrun generate-keypair.ts
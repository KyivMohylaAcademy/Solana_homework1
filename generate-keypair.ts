import "dotenv/config";
const { getKeypairFromEnvironment } = require('@solana-developers/helpers');
 
const keypair = getKeypairFromEnvironment("SECRET_KEY");
 
console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`,
);
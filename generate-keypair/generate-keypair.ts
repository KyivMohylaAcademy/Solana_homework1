import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
console.log(process.env.SECRET_KEY);
const keypair = getKeypairFromEnvironment("SECRET_KEY");
 
console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`,
);
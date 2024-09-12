import * as dotenv from "dotenv";
dotenv.config();
import { getKeypairFromEnvironment } from "./helpers/src";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`
);

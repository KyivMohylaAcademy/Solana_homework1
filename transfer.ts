import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    SendTransactionError,
    LAMPORTS_PER_SOL,
  } from "@solana/web3.js";
  import "dotenv/config";
import { getEnabledCategories } from "trace_events";
  const { getKeypairFromEnvironment, airdropIfRequired } = require("@solana-developers/helpers");
   
  const suppliedToPubkey = process.argv[2] || null;
   
  if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
  }
   
  const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
   
  console.log(`suppliedToPubkey: ${suppliedToPubkey}`);
   
  const toPubkey = new PublicKey(suppliedToPubkey);
   
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  
    await airdropIfRequired(
        connection,
        toPubkey,
        1 * LAMPORTS_PER_SOL,
        0.5 * LAMPORTS_PER_SOL,
    );

  const bal = await connection.getBalance(senderKeypair.publicKey);
   
  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana ${bal}`, 
  );
   
  const transaction = new Transaction();
   
  const LAMPORTS_TO_SEND = 5000;
   
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
  });
   
  transaction.add(sendSolInstruction);
   
  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [
        senderKeypair,
      ]);
    
        console.log(
            `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
        );
        console.log(`Transaction signature is ${signature}!`);
  } catch (error) {
    const logs = await error.getLogs(); // Використовуємо await для асинхронного методу
    console.log(logs);
    }
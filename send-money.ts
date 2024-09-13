import * as web3 from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

let payer;
try {
  payer = getKeypairFromEnvironment("SECRET_KEY");
} catch (error) {
  console.error("❌ Couldn't read SECRET_KEY.");
  process.exit(1);
}

const recipient = process.argv[2];
if (!recipient) {
  console.error("❌ Provide recipient's public key");
  process.exit(1);
}

const solAmountString = process.argv[3];
if (!solAmountString) {
  console.error("❌ Provide amount of SOL to send");
  process.exit(1);
}

const solAmount = parseFloat(solAmountString);
if (isNaN(solAmount) || solAmount <= 0) {
  console.error("❌ Invalid amount of SOL");
  process.exit(1);
}

try {
  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  console.log(`🔑 Payer key (sender) ${payer.publicKey.toBase58()}`);

  const senderBalanceBefore = await connection.getBalance(payer.publicKey);
  console.log(
    `💰 Sender balance before: ${
      senderBalanceBefore / web3.LAMPORTS_PER_SOL
    } SOL`
  );

  const lamportsToSend = solAmount * web3.LAMPORTS_PER_SOL;

  if (senderBalanceBefore < lamportsToSend) {
    console.error(
      `❌ You don't have enough funds. Balance: ${
        senderBalanceBefore / web3.LAMPORTS_PER_SOL
      } SOL.`
    );
    process.exit(1);
  }

  const recipientPublicKey = new web3.PublicKey(recipient);
  console.log(`🔑 Recipient key ${recipientPublicKey.toBase58()}`);

  const recipientBalanceBefore = await connection.getBalance(
    recipientPublicKey
  );
  console.log(
    `💰 Recipient balance before: ${
      recipientBalanceBefore / web3.LAMPORTS_PER_SOL
    } SOL`
  );

  const transaction = new web3.Transaction();

  const instruction = web3.SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: recipientPublicKey,
    lamports: lamportsToSend,
  });

  transaction.add(instruction);

  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
  );

  console.log(`✅ Transaction completed! Signature is ${signature}`);
  console.log(
    `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
  );

  const senderBalanceAfter = await connection.getBalance(payer.publicKey);
  console.log(
    `💰 Sender balance after transaction: ${
      senderBalanceAfter / web3.LAMPORTS_PER_SOL
    } SOL`
  );

  const recipientBalanceAfter = await connection.getBalance(recipientPublicKey);
  console.log(
    `💰 Recipient balance after transaction: ${
      recipientBalanceAfter / web3.LAMPORTS_PER_SOL
    } SOL`
  );
} catch (error) {
  console.error("❌ Error ocurred:", error);
}

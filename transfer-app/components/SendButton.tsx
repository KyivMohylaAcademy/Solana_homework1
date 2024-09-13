import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { FC, useState, useEffect } from "react";
import styles from "../styles/SendButton.module.css";

export const SendButton: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [balance, setBalance] = useState<number | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [signature, setSignature] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then((balance) => {
        setBalance(balance / LAMPORTS_PER_SOL);
      });
    }
  }, [connection, publicKey]);

  const onSendClick = async () => {
    if (!connection || !publicKey || !amount || !recipient) {
      console.error("Missing information(wallet, amount, or recipient)");
      return;
    }

    try {
      const transaction = new Transaction();
      const recipientPubKey = new PublicKey(recipient);

      const instruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubKey,
        lamports: Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL),
      });

      transaction.add(instruction);

      const txSignature = await sendTransaction(transaction, connection);
      setSignature(txSignature);
      console.log("Transaction Signature:", txSignature);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>
        Wallet Balance: {balance !== null ? balance.toFixed(2) : "..."} SOL
      </h3>
      <div className={styles.formGroup}>
        <label>Amount (SOL):</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.01"
          className={styles.inputField}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Recipient Address:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter recipient address"
          className={styles.inputField}
        />
      </div>
      <button className={styles.button} onClick={onSendClick}>
        Send SOL
      </button>
      {signature && (
        <div className={styles.transactionLink}>
          <p>View your transaction on Solana Explorer:</p>
          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
          </a>
        </div>
      )}
    </div>
  );
};

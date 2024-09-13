import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/PingButton.module.css";

const PROGRAM_ID = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const DATA_ACCOUNT_PUBKEY = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

export const PingButton: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [signature, setSignature] = useState<string | null>(null);

  const onClick = async () => {
    if (!connection || !publicKey) {
      console.error("Wallet not connected or connection unavailable");
      return;
    }

    try {
      const programId = new PublicKey(PROGRAM_ID);
      const programDataAccount = new PublicKey(DATA_ACCOUNT_PUBKEY);
      const transaction = new Transaction();

      const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: programDataAccount,
            isSigner: false,
            isWritable: true,
          },
        ],
        programId,
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
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={onClick}>
        Ping!
      </button>
      {signature && (
        <div className={styles.transactionLink}>
          <p>You can view your transaction on Solana Explorer at:</p>
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

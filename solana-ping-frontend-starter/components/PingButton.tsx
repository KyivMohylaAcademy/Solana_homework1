import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  TransactionInstruction
} from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/PingButton.module.css";

export const PingButton: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
 
  const onClick = async () => {
	if (!connection || !publicKey) {
	  console.error("Wallet not connected or connection unavailable");
	}
   
	try {
	  const programId = new PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa');
	  const programDataAccount = new PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod');
	  const transaction = new Transaction();
	  const rc = (await connection.getLatestBlockhash('finalized')).blockhash;

	  const instruction = new TransactionInstruction({
	
		keys: [
		  {
			pubkey: programDataAccount,
			isSigner: false,
			isWritable: true,
		  },
		],
		programId,
		data: Buffer.alloc(0)
	  });
   
	  transaction.add(instruction);
	  transaction.recentBlockhash = rc;

	  const signature = await sendTransaction(transaction, connection);
	  console.log("Transaction Signature:", signature);
	} catch (error) {
	  console.error("Transaction failed:", error);
	}
  };
 
  return (
    <div className={styles.buttonContainer} onClick={onClick}>
      <button className={styles.button}>Ping!</button>
    </div>
  );
};
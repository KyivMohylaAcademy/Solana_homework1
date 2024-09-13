import { FC, useEffect, useState } from 'react';
import styles from '../styles/PingButton.module.css';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import {LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction} from "@solana/web3.js";

export const SendSol: FC = () => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
	const [balance, setBalance] = useState<number | null>(null);
	const [receiverAddress, setReceiverAddress] = useState<string>('');
	const [amountSol, setAmountSol] = useState<number>(0);
	const [transactionStatus, setTransactionStatus] = useState<string | null>(null);

	useEffect(() => {
		const getSolanaWalletBalance = async () => {
			if (publicKey) {
				try {
					const balanceInLamports = await connection.getBalance(publicKey);
					const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
					setBalance(balanceInSOL);
				} catch (error) {
					console.error(error);
				}
			}
		};

		getSolanaWalletBalance();
	}, [connection, publicKey]);

	const sendSol = async () => {
		if (!connection || !publicKey) {
			console.error("Wallet not connected or connection unavailable");
			return;
		}

		try {
			const receiverKey = new PublicKey(receiverAddress);
			const transaction = new Transaction();
			const instruction = SystemProgram.transfer({
				fromPubkey: publicKey,
				toPubkey: receiverKey,
				lamports: amountSol * LAMPORTS_PER_SOL,
			});
			transaction.add(instruction);

			const signature = await sendTransaction(transaction, connection);
			setTransactionStatus(`✅ Transaction successful with signature: ${signature}`);
			console.log(`You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={styles.buttonContainer}>
			<div>
				<p>Wallet Address: {publicKey?.toBase58() || 'Not connected'}</p>
				{balance !== null && (
					<p>Balance: {balance.toFixed(4)} SOL</p>
				)}
			</div>
			<div className={styles.form}>
				<input type="text" placeholder="Recipient Address" value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)}/>
				<input type="number" placeholder="Amount (SOL)" value={amountSol} onChange={(e) => setAmountSol(parseFloat(e.target.value))}/>
				<button className={styles.button} onClick={sendSol}>Send SOL</button>
			</div>
			{transactionStatus && <p>{transactionStatus}</p>}
		</div>
	);
};

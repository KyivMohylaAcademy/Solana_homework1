import {Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {getDomainKeySync} from "@bonfida/spl-name-service";

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

const getSolanaPriceInUSD = async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
    const data = await response.json();
    return data.solana.usd;
};

const getSolanaWalletBalance = async (publicKeyInput : string) => {
    try{
        const publicKey = new PublicKey(publicKeyInput);
        const balanceInLamports = await connection.getBalance(publicKey);
        return balanceInLamports / LAMPORTS_PER_SOL;
    } catch (error) {
        throw new Error("❌ Provided public key might be wrong.");
    }
};

const getPublicKeyFromSolDomain = async (domain: string) => {
    return getDomainKeySync(domain).pubkey.toString();
}

const main = async () => {
    try{
        let suppliedPublicKey = process.argv[2];
        if(!suppliedPublicKey){
            throw new Error("Provide a public key");
        } else if (suppliedPublicKey.endsWith('.sol')){
            suppliedPublicKey = await getPublicKeyFromSolDomain(process.argv[2])
        } else {
            suppliedPublicKey = process.argv[2];
        }
        const balanceInSOL = await getSolanaWalletBalance(suppliedPublicKey);
        const solPriceInUSD = await getSolanaPriceInUSD();
        const balanceInUSD = balanceInSOL * solPriceInUSD;
        console.log(
            `✅ Finished! The balance for the wallet at address ${suppliedPublicKey} is ${balanceInSOL} SOL!`
        );
        console.log(
            `💵 The balance in USD is approximately $${balanceInUSD.toFixed(2)} USD! (current rate $${solPriceInUSD})`
        );
    } catch (error){
        console.error(error);
    }


}

main();
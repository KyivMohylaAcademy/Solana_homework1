import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { getDomainKeySync, NameRegistryState } from "@bonfida/spl-name-service";

const main = async () => {
    const suppliedDomainOrPublicKey = process.argv[2];
    if (!suppliedDomainOrPublicKey)
    {
        throw new Error("Provide a public key to check the balance of!");
    }
    const connection = new Connection(clusterApiUrl("mainnet-beta"));

    const getPublicKeyFromSolDomain = async (domain: string) =>
    {
        const { pubkey } = getDomainKeySync(domain);
        return new PublicKey(pubkey);
    };

    let publicKey;
    try {
        if (suppliedDomainOrPublicKey.endsWith(".sol"))
        {
            console.log(`Resolving domain: ${suppliedDomainOrPublicKey}`);
            publicKey = await getPublicKeyFromSolDomain(suppliedDomainOrPublicKey);
        } else
        {
            publicKey = new PublicKey(suppliedDomainOrPublicKey);
        }

        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

        console.log(`
💰 Finished! 
The balance for the wallet at address ${publicKey.toBase58()} is 
${balanceInSOL} SOL that is 
${balanceInLamports} Lamports!`);
    } catch (error)
    {
        console.error(error);
    }
};

main();
